<?php

use  PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'phpmailer/Exception.php';

var_dump($_POST);
$data = $_POST['arrFromJS'];
$arr = json_decode($data);
$name = $arr[count($arr) - 2];
$tel = end($arr);
$q1 = $arr[0];
$q2 = $arr[1];
$q3 = $arr[2];
$q4 = $arr[3];
$q5 = $arr[4];
$q6 = $arr[5];
$q7 = $arr[6];
$q8 = $arr[7];
$q9 = $arr[8];
$message = $_POST["message"];
$email_template = "template_mail.html";
$body = file_get_contents($email_template);
$body = str_replace('%name%', $name, $body);
$body = str_replace('%tel%', $tel, $body);
$body = str_replace('%q1%', $q1, $body);
$body = str_replace('%q2%', $q2, $body);
$body = str_replace('%q3%', $q3, $body);
$body = str_replace('%q4%', $q4, $body);
$body = str_replace('%q5%', $q5, $body);
$body = str_replace('%q6%', $q6, $body);
$body = str_replace('%q7%', $q7, $body);
$body = str_replace('%q8%', $q8, $body);
$body = str_replace('%q9%', $q9, $body);

try {
  if ($tel) {
    // Создаем письмо
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();                   // Отправка через SMTP
    $mail->SMTPDebug = 0;
    $mail->Host   = 'smtp.yandex.ru';  // Адрес SMTP сервера
    $mail->SMTPAuth   = true;          // Enable SMTP authentication
    $mail->Username   = 'galinagus57';       // ваше имя пользователя (без домена и @)
    $mail->Password   = 'Recklama33';    // ваш пароль
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->setFrom('galinagus57@yandex.ru', 'Лучший в мире Квиз');    // от кого
    $mail->addAddress('galaguss@yandex.ru', 'Разработчик'); // кому
    $mail->Subject = 'Заявка с квиза';
    $mail->MsgHTML($body);
    $mail->send();
    echo 'Ваша Заявка Отправлена!';
  }
} catch (phpmailerException $e) {
}
