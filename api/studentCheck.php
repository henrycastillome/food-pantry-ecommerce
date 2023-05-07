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

    case "GET":
        if(isset($_GET['studentId'])){
        $studentId = $_GET["studentId"];
        $stmt = $pdo->prepare(
                "SELECT COUNT(*) FROM student WHERE student_id = :studentId
                AND student_id NOT IN (SELECT student_id FROM user 
                WHERE student_id = :studentId2 )
                " 
                    );
        $stmt->bindParam(':studentId', $studentId);
        $stmt->bindParam(':studentId2', $studentId);
        $stmt->execute();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
          
        
      
        echo json_encode($count);
    }
        break;
        




}

?>
