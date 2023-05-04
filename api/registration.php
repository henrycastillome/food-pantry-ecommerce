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
        $stmt = $pdo->prepare('INSERT INTO user (user_name, user_lname, user_email,password_user, user_phone, stu_id)
           VALUES (:firstName, :lastName, :email, :pass, :phoneNumber, :studentId)');

        $firstName=sanitizeString($data->firstName);
        $lastName=sanitizeString($data->lastName);
        $email=sanitizeString($data->email);
        $studentId=sanitizeString($data->studentId);

        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':pass', password_hash(sanitizeString($data->pass), PASSWORD_DEFAULT));
        $stmt->bindParam(':phoneNumber', sanitizeString($data->phoneNumber));
        $stmt->bindParam(':studentId', $studentId);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'User registered successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to register'];
        }
        echo json_encode($response);
        break;

    case "GET":
        if(isset($_GET['phoneNumber'])){
        $phoneNumbers = $_GET["phoneNumber"];
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM user WHERE user_phone = :phoneNumber");
        $stmt->bindParam(':phoneNumber', $phoneNumbers);
        $stmt->execute();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
          
        
      
        echo json_encode($count);
    }
        break;
        




}

?>
