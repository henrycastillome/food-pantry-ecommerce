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

// $admin_name="";
// $admin_lname="";
// $admin_email="";
// $admin_password="";



$stmt = $pdo->prepare('INSERT INTO admin_users (admin_name, admin_lname, admin_email,admin_password)
    VALUES (:admin_name, :admin_lname, :admin_email,:admin_password)');

$stmt->bindParam(':admin_name', sanitizeString($admin_name));
$stmt->bindParam(':admin_lname', sanitizeString($admin_lname));
$stmt->bindParam(':admin_email', sanitizeString($admin_email));
$stmt->bindParam(':admin_password', password_hash(sanitizeString($admin_password), PASSWORD_DEFAULT));


$stmt->execute();

if ($stmt) {
    echo 'success';
} else {
    echo "failure";
}









?>
