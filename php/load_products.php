<?php
header('Content-Type: application/json');

$mysqli = new mysqli('localhost', 'root', '', 'UTSShop');
if ($mysqli->connect_error) {
  die(json_encode([]));
}

$query = '';
if (isset($_GET['category'])) {
  $category = $mysqli->real_escape_string($_GET['category']);
  $query = "SELECT * FROM products WHERE main_category = '$category' OR sub_category = '$category'";
} elseif (isset($_GET['query'])) {
  $keyword = $mysqli->real_escape_string($_GET['query']);
  $query = "SELECT * FROM products WHERE 
            name LIKE '%$keyword%' OR 
            description LIKE '%$keyword%' OR 
            main_category LIKE '%$keyword%' OR 
            sub_category LIKE '%$keyword%'";
} else {
  echo json_encode([]);
  exit;
}

$result = $mysqli->query($query);
$products = [];

while ($row = $result->fetch_assoc()) {
  $productId = $row['id'];
  $units = [];

  $unitResult = $mysqli->query("SELECT unit_name, unit_price, stock FROM product_units WHERE product_id = $productId");

  while ($unitRow = $unitResult->fetch_assoc()) {
    $units[] = [
      'unit' => $unitRow['unit_name'],
      'price' => $unitRow['unit_price'],
      'stock' => $unitRow['stock']
    ];
  }

  $products[] = [
    'id' => $row['id'],
    'name' => $row['name'],
    'main_category' => $row['main_category'],
    'sub_category' => $row['sub_category'],
    'image' => $row['image'],
    'description' => $row['description'],
    'units' => $units
  ];
}

echo json_encode($products);
$mysqli->close();
?>
