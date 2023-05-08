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
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error connecting to the database: " . $e->getMessage();
    exit;
}


$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
   case "GET":
       
       try{
        $stmt = $pdo->prepare("
        SELECT 
        o.orders_id, 
        o.created_at, 
        CONCAT(u.user_name, ' ', u.user_lname) AS user_full_name, 
        s.student_id,
        GROUP_CONCAT(CONCAT(i.item_name, ' (', oi.quantity, ')') SEPARATOR ', ') AS items_and_quantities
            FROM
                orders o
            JOIN
                order_items oi ON o.orders_id = oi.orders_id
            JOIN
                items i ON oi.item_id = i.item_id
            JOIN
                user u ON o.user_id = u.user_id
            JOIN
                student s ON u.student_id = s.student_id
            GROUP BY
                o.orders_id;
    
        ");
        $stmt->execute();
        $allProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($allProducts);
       }catch(PDOException $e){
        echo "Error executing the query:  ".$e->getMessage();
        exit;
       }
       break;

       case "DELETE":
        $id =  explode('/', $_SERVER['REQUEST_URI']);
        
        $sanitized_id = sanitizeString($id[5]);
        $stmt=$pdo->prepare('DELETE FROM orders WHERE orders_id = :order_id;');

        $stmt->bindParam(':order_id', $sanitized_id);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
       
      
    }
