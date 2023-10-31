


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

function sendReponse($status, $message){
    $response = ['status' => $status, 'message' => $message];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

try {
    $pdo = new PDO($attr, $user, $pass, $opts);
} catch (PDOException $e) {
    sendReponse(0, "Database connection error: ".$e->getMessage());
}


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        
        try{
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);

        //validata input data

        if(!isset($data['user_id']) || !isset($data['items'])){
            sendReponse(0, 'Invalid input data.');
        }

        $stmt = $pdo->prepare("INSERT INTO orders (user_id) VALUES (:user_id)");
        $user_id=sanitizeString($data['user_id']);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        $order_id = $pdo->lastInsertId();
        $items=$data['items'];
        
        foreach($items as $item){
            $item_id=$item['item_id'];
            $quantity=$item['quantity'];
        

        $stmt = $pdo->prepare("INSERT INTO orders_items (orders_id, item_id, quantity) VALUES (:order_id, :item_id, :quantity)");

        $stmt->bindParam(':order_id', $order_id);
        $stmt->bindParam(':item_id', $item_id);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->execute();

        $stmt = $pdo->prepare("UPDATE items SET item_quantity = item_quantity - :quantity WHERE item_id = :item_id");
        $stmt->bindParam(':item_id', $item_id);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->execute();
        }

        sendReponse(1, 'Order submitted successfully.'  );
    } catch(PDOException $e){
        sendReponse(0, 'Database error: '.$e->getMessage());    
    }

    header('Content-Type: application/json');
  
        echo json_encode($response);
        break;
    default:
    sendReponse(0, 'Request method not accepted.');

 




}
?>