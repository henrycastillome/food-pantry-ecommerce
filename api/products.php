<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once 'login.php';

function sanitizeString($var)
{
    $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    
    return $var;
}

try {
    $pdo = new PDO($attr, $user, $pass, $opts);
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData);
        $stmt = $pdo->prepare('INSERT INTO items (item_name, item_category, item_quantity, item_image)
           VALUES (:productName, :category, :quantity, :imageName)');

        $productName=sanitizeString($data->productName);
        $category=sanitizeString($data->category);
        $quantity=sanitizeString($data->quantity);
        $imageName=($data->imageName);
        $stmt->bindParam(':productName', $productName);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':imageName', $imageName);
      


        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Item added succesfuly'];
            echo json_encode($response);
        } else {
            $error = $stmt->errorInfo();
            if ($error[0] === '23000' && $error[1] === 1062) {
                $response = ['status' => 0, 'message' => 'Item already exists'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to add new product'];
    }
    echo json_encode($response);
}
            
        
        
        break;

        case "DELETE":
            $id =  explode('/', $_SERVER['REQUEST_URI']);
            $sanitized_id = sanitizeString($id[5]);
            $stmt=$pdo->prepare('DELETE FROM items WHERE item_id=:id');
    
            $stmt->bindParam(':id', $sanitized_id);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;

        case "PUT":
            $rawData = file_get_contents('php://input');
            $data = json_decode($rawData);
            $stmt = $pdo->prepare('UPDATE items SET item_quantity=:new_quantity WHERE item_id=:id');

            $new_quantity=sanitizeString($data->item_quantity);
            $id=sanitizeString($data->item_id);
            $stmt->bindParam(':new_quantity', $new_quantity);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Item updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update item'];
            }
            echo json_encode($response);
            
    }




   
        
?>

