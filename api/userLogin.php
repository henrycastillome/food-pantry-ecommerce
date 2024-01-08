


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
        $stmt = $pdo->prepare('SELECT * FROM user WHERE user_email=:email');
        $email = sanitizeString($data->email);
        $stmt->bindParam(':email', $email);

    
   
        $stmt->execute();
        $database_response=$stmt->fetch(PDO::FETCH_ASSOC);

        

        if ($database_response && password_verify(sanitizeString($data->pass), $database_response['password_user'] )) {
            $response = ['status' => 1, 'message' => 'success', "user_name"=>$database_response['user_name'], "user_id"=>$database_response['user_id']];
        } else {
            $response = ['status' => 0, 'message' => 'email or password not found'];
        }
        echo json_encode($response);
        break;

 




}
?>