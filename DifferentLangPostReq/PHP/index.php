<?php
$url = 'https://dev.29kreativ.com/recruitment/levels/';

$code = '8fc95a69adbc08a22bb90e19e66b389d';

$fields = [
    'name' => 'Tushar',
    'code' => $code
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $code,
    'Content-Type: application/x-www-form-urlencoded'
]);

$response = curl_exec($ch);

if ($response === false) {
    echo 'Error: ' . curl_error($ch);
}

$responseHeaders = curl_getinfo($ch);

curl_close($ch);

echo "Response body:\n";
echo $response;

?>
