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
        $stmt = $pdo->prepare("SELECT * FROM items ORDER BY RAND() LIMIT 6");
        $stmt->execute();
        $allProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($allProducts)>0){
            http_response_code(200); // ok
        
            echo json_encode(["data"=>["products"=>$allProducts]]);
        }else{
            http_response_code(404); //not found
            echo json_encode(["error"=>"No products found."]);
        }
       }catch(PDOException $e){
        http_response_code(500);//internal server error
        echo json_encode(["error"=>"Error executing the query:  ".$e->getMessage()]);
        exit;
       }
       break;
       
      
    }

    

   
        


?>