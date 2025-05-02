<?php
header('Content-Type: application/json');
$mysqli = new mysqli('localhost', 'root', '', 'UTSShop', 3307);

if ($mysqli->connect_error) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
  exit();
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['cart']) || !is_array($data['cart'])) {
  echo json_encode(['success' => false, 'message' => 'Invalid cart data.']);
  exit();
}

$cart = $data['cart'];

foreach ($cart as $item) {
  $productId = intval($item['productId']);
  $unit = $item['unit'];
  $quantity = intval($item['quantity']);

  $stmt = $mysqli->prepare("SELECT stock FROM product_units WHERE product_id = ? AND unit_name = ?");
  $stmt->bind_param("is", $productId, $unit);
  $stmt->execute();
  $stmt->bind_result($stock);
  if (!$stmt->fetch()) {
    $stmt->close();
    echo json_encode(['success' => false, 'message' => "Item not found for Product ID $productId, unit $unit."]);
    exit();
  }
  $stmt->close();

  if ($quantity > intval($stock)) {
    echo json_encode(['success' => false, 'message' => "Insufficient stock for Product ID $productId ($unit). Available: $stock"]);
    exit();
  }
}

foreach ($cart as $item) {
  $productId = intval($item['productId']);
  $unit = $item['unit'];
  $quantity = intval($item['quantity']);

  $stmt = $mysqli->prepare("UPDATE product_units SET stock = stock - ? WHERE product_id = ? AND unit_name = ?");
  $stmt->bind_param("iis", $quantity, $productId, $unit);
  $stmt->execute();
  $stmt->close();
}

echo json_encode(['success' => true]);
?>
