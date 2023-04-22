<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once 'login.php';

try
{
$pdo = new PDO($attr, $user, $pass, $opts);
}
catch (PDOException $e)
{
throw new PDOException($e->getMessage(), (int)$e->getCode());
}
// $firstName='Henry';
// $lastName="Castilo";
// $email="hcasti40@pratt.edu";
// $phone="3476326675";
// $studentId="55555";

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $rawData=file_get_contents('php://input');
        $data=json_decode($rawData);
        $stmt = $pdo->prepare('INSERT INTO user (user_name, user_lname, user_email, user_phone, stu_id)
           VALUES (:firstName, :lastName, :email, :phoneNumber, :studentId)');
        $stmt->bindParam(':firstName', $data->firstName);
        $stmt->bindParam(':lastName', $data->lastName);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':phoneNumber', $data->phoneNumber);
        $stmt->bindParam(':studentId', $data->studentId);
        
        $stmt->execute();

        if($stmt){
    echo '<script>alert("sucess")</script>';
  }
  else {
    echo "failure";
  }
        
}


// if($stmt){
//     echo '<script>alert("sucess")</script>';
//   }
//   else {
//     echo "failure";
//   }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {

//         $rawData = file_get_contents("php://input");
//         $data = json_decode($rawData);
       
       
//             // Get the form data
//             $firstName = $_POST['firstName'];
//             $lastName = $_POST['lastName'];
//             $email = $_POST['email'];
//             $phoneNumber = $_POST['phoneNumber'];
//             $studentId = $_POST['studentId'];
//         $stmt = $pdo->prepare('INSERT INTO user (user_name, user_lname, user_email, user_phone, stu_id)
//                 VALUES (:firstname, :lastName, :email, :phoneNumber, :studentId)');
        
//         $stmt->bindParam(':firstname',$data-> $firstName);
//         $stmt->bindParam(':lastName',$data-> $lastName);
//         $stmt->bindParam(':email',$data->$email);
//         $stmt->bindParam(':phoneNumber', $data->$phoneNumber);
//         $stmt->bindParam(':studentId',$data-> $studentId);

//         if($stmt->execute()) {
//             $response = array(
//                 'status' => 'success',
//                 'message' => 'Form submitted and data inserted into database',
//                 'data' => array(
//                   'firstName' => $firstName,
//                   'lastName' => $lastName,
//                   'email' => $email,
//                   'phoneNumber' => $phoneNumber,
//                   'studentId' => $studentId
//                 )
//               );
//         } else {
//             $response = ['status' => 0, 'message' => 'Failed to create record.'];
//         }
//         header('Content-Type: application/json');
//         echo json_encode($response);
        
//     }