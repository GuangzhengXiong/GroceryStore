$(document).ready(function () {
    $('.dropdown div').click(function (e) {
      e.stopPropagation();
      const category = $(this).data('category');
      loadProductsByCategory(category);
    });
  
    $('.nav-item').click(function (e) {
      if (!$(e.target).closest('.dropdown').length) {
        const category = $(this).data('main');
        loadProductsByCategory(category);
      }
    });
  
    $('#search-btn').click(function () {
      const keyword = $('#search-box').val().trim();
      if (keyword !== '') {
        searchProducts(keyword);
      }
    });
  });
  
  function searchProducts(keyword) {
    $('#initial-message').hide();
    $('#product-list').empty();
    $.get(`php/load_products.php?query=${encodeURIComponent(keyword)}`, function (data) {
      renderProducts(data);
    });
  }
  
  function loadProductsByCategory(category) {
    $('#initial-message').hide();
    $('#product-list').empty();
    $.get(`php/load_products.php?category=${encodeURIComponent(category)}`, function (data) {
      renderProducts(data);
    });
  }
  
  function renderProducts(data) {
    if (data.length === 0) {
      $('#product-list').html('<p>No products found.</p>');
      return;
    }
  
    data.forEach(product => {
      let unitOptions = '';
      product.units.forEach(u => {
        unitOptions += `<option>${u.unit} - $${u.price} (${u.stock} in stock)</option>`;
      });
  
      const card = `
        <div class="product-card">
          <div class="image-area">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <h3>${product.name}</h3>
          <select>${unitOptions}</select>
          <p class="price">$${product.units[0]?.price || 'N/A'}</p>
          <p class="stock">${product.units[0]?.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        </div>
      `;
  
      $('#product-list').append(card);
    });
  }
  
  function resetPage() {
    $('#product-list').empty();
    $('#initial-message').show();
  }
  