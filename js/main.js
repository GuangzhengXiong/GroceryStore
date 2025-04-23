$(document).ready(function () {
  const lastQuery = localStorage.getItem('lastQuery');
  const queryType = localStorage.getItem('queryType');

  if (lastQuery && queryType) {
    if (queryType === 'search') {
      searchProducts(lastQuery);
    } else if (queryType === 'category') {
      loadProductsByCategory(lastQuery);
    }
  }

  $('.dropdown div').click(function (e) {
    e.stopPropagation();
    const category = $(this).data('category');
    clearSearchBox();
    loadProductsByCategory(category);
  });

  $('.nav-item').click(function (e) {
    if (!$(e.target).closest('.dropdown').length) {
      const category = $(this).data('main');
      clearSearchBox();
      loadProductsByCategory(category);
    }
  });

  $('#search-btn').click(function () {
    const keyword = $('#search-box').val().trim();
    if (keyword !== '') {
      searchProducts(keyword);
    }
  });

  $('#search-box').on('keypress', function (e) {
    if (e.which === 13) {
      const keyword = $(this).val().trim();
      if (keyword !== '') {
        searchProducts(keyword);
      }
    }
  });

  $('.nav-logo').click(function () {
    clearSearchBox();
    resetPage();
  });

  $('.cart-icon').click(function () {
    clearSearchBox();
    toggleCart();
  });
});

function searchProducts(keyword) {
  localStorage.setItem('lastQuery', keyword);
  localStorage.setItem('queryType', 'search');

  $('#initial-message').hide();
  $('#product-list').empty();
  $.get(`php/load_products.php?query=${encodeURIComponent(keyword)}`, function (data) {
    renderProducts(data);
  });
}

function loadProductsByCategory(category) {
  localStorage.setItem('lastQuery', category);
  localStorage.setItem('queryType', 'category');

  $('#initial-message').hide();
  $('#product-list').empty();
  $.get(`php/load_products.php?category=${encodeURIComponent(category)}`, function (data) {
    renderProducts(data);
  });
}

function resetPage() {
  $('#search-box').val('');
  $('#product-list').empty();
  $('#initial-message').show();
  localStorage.removeItem('lastQuery');
  localStorage.removeItem('queryType');
}

function clearSearchBox() {
  $('#search-box').val('');
}

function toggleCart() {
  window.location.href = 'cart.html';
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingIndex = cart.findIndex(
    p => p.productId === item.productId && p.unit === item.unit
  );

  if (existingIndex >= 0) {
    if (cart[existingIndex].quantity < cart[existingIndex].stock) {
      cart[existingIndex].quantity += 1;
    }
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  $('.cart-icon')
    .css('background-color', '#444')
    .delay(150)
    .queue(function (next) {
      $(this).css('background-color', '');
      next();
    });
}

function renderProducts(data) {
  if (data.length === 0) {
    $('#product-list').html('<p>No products found.</p>');
    return;
  }

  data.forEach(product => {
    const units = product.units;
    const firstUnit = units[0];

    let unitOptions = '';
    units.forEach((u, i) => {
      unitOptions += `<option value="${i}">${u.unit}</option>`;
    });

    const card = `
      <div class="product-card" data-id="${product.id}">
        <div class="image-area">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <h3>${product.name}</h3>
        <select class="unit-select" data-units='${JSON.stringify(units)}'>
          ${unitOptions}
        </select>
        <p class="price">$${parseFloat(firstUnit.price).toFixed(2)}</p>
        <p class="stock">${firstUnit.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        <button class="add-to-cart" ${firstUnit.stock <= 0 ? 'disabled' : ''}>Add to Cart</button>
      </div>
    `;

    $('#product-list').append(card);
  });

  $('.unit-select').on('change', function () {
    const units = JSON.parse($(this).attr('data-units'));
    const index = parseInt($(this).val());
    const unit = units[index];
    const card = $(this).closest('.product-card');
    card.find('.price').text(`$${parseFloat(unit.price).toFixed(2)}`);
    card.find('.stock').text(unit.stock > 0 ? 'In Stock' : 'Out of Stock');

    const addButton = card.find('.add-to-cart');
    if (unit.stock <= 0) {
      addButton.prop('disabled', true);
      addButton.addClass('disabled');
    } else {
      addButton.prop('disabled', false);
      addButton.removeClass('disabled');
    }
  });

  $('.add-to-cart').on('click', function () {
    const btn = $(this);
    btn.addClass('clicked');
    setTimeout(() => {
      btn.removeClass('clicked');
    }, 150);

    const card = $(this).closest('.product-card');
    const id = card.data('id');
    const name = card.find('h3').text();
    const image = card.find('img').attr('src');
    const units = JSON.parse(card.find('select').attr('data-units'));
    const selectedIndex = parseInt(card.find('select').val());
    const selectedUnit = units[selectedIndex];

    const cartItem = {
      productId: id,
      unit: selectedUnit.unit,
      name: name,
      price: parseFloat(selectedUnit.price),
      image: image,
      quantity: 1,
      stock: parseInt(selectedUnit.stock)
    };

    addToCart(cartItem);
  });

  $('.unit-select').trigger('change');
}
