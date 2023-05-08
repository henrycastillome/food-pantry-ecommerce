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
        $stmt = $pdo->prepare("SELECT user_id, user_name, user_lname, user_email, user_phone, student_id FROM user");
        $stmt->execute();
        $allProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($allProducts);
       }catch(PDOException $e){
        echo "Error executing the query:  ".$e->getMessage();
        exit;
       }
       break;
       
      
    }

    

   
        


?>