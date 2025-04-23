<?php
$conn = new mysqli("localhost", "root", "", "UTSShop");
$conn->set_charset("utf8");

$query = $_GET['query'] ?? '';
$category = $_GET['category'] ?? '';
$products = [];

if ($query !== '') {
    $q = $conn->real_escape_string($query);
    $sql = "SELECT * FROM products 
            WHERE name LIKE '%$q%'
               OR description LIKE '%$q%'
               OR main_category LIKE '%$q%'
               OR sub_category LIKE '%$q%'
            LIMIT 30";
} elseif ($category !== '') {
    $c = $conn->real_escape_string($category);
    $sql = "SELECT * FROM products 
            WHERE main_category = '$c' 
               OR sub_category = '$c'
            LIMIT 30";
} else {
    echo json_encode([]);
    exit;
}

$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    $productId = $row['id'];
    $unitSql = "SELECT unit, price, stock FROM product_units WHERE product_id = $productId";
    $unitResult = $conn->query($unitSql);
    $units = [];
    while ($u = $unitResult->fetch_assoc()) {
        $units[] = $u;
    }

    $products[] = [
        'id' => $productId,
        'name' => $row['name'],
        'image' => $row['image'],
        'description' => $row['description'],
        'units' => $units
    ];
}

header('Content-Type: application/json');
echo json_encode($products);
?>
