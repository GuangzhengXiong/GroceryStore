$(document).ready(function () {
    loadCart();
  });
  
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = $('#cart-items');
    const summary = $('.cart-summary');
    container.empty();
  
    if (cart.length === 0) {
      $('#empty-message').show();
      summary.hide();
      return;
    }
  
    $('#empty-message').hide();
    summary.show();
  
    let total = 0;
  
    cart.forEach(item => {
      const itemTotal = parseFloat(item.price) * item.quantity;
      total += itemTotal;
  
      const disableMinus = item.quantity <= 1 ? 'disabled' : '';
      const disablePlus = item.quantity >= parseInt(item.stock) ? 'disabled' : '';
  
      const itemHTML = `
        <div class="cart-item" data-id="${item.productId}">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Unit: ${item.unit}</p>
            <p>Price: $${parseFloat(item.price).toFixed(2)}</p>
            <p class="item-total">Total: $${itemTotal.toFixed(2)}</p>
          </div>
          <div class="cart-controls">
            <button class="minus" ${disableMinus}>-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" max="${item.stock}" data-unit="${item.unit}" data-original="${item.quantity}" />
            <button class="plus" ${disablePlus}>+</button>
            <button class="remove">Remove</button>
          </div>
        </div>
      `;
  
      container.append(itemHTML);
    });
  
    $('#cart-total').text(`$${total.toFixed(2)}`);
    $('.place-order').prop('disabled', false);
  
    bindCartEvents();
  }
  
  function bindCartEvents() {
    $('.minus').click(function () {
      const $input = $(this).siblings('.quantity-input');
      let value = parseInt($input.val());
      if (value > 1) {
        value--;
        $input.val(value);
        updateCartItemQuantityFromInput($input);
      }
    });
  
    $('.plus').click(function () {
      const $input = $(this).siblings('.quantity-input');
      let value = parseInt($input.val());
      const max = parseInt($input.attr('max'));
      if (value < max) {
        value++;
        $input.val(value);
        updateCartItemQuantityFromInput($input);
      }
    });
  
    $('.quantity-input').on('blur', function () {
      const $input = $(this);
      const original = $input.data('original');
      let value = parseInt($input.val());
      const max = parseInt($input.attr('max'));
  
      if (isNaN(value)) {
        $input.val(original);
        return;
      }
  
      if (value < 1) value = 1;
      if (value > max) value = max;
  
      $input.val(value);
      updateCartItemQuantityFromInput($input);
    });
  
    $('.remove').click(function () {
      const card = $(this).closest('.cart-item');
      const productId = card.data('id');
      const unit = card.find('.quantity-input').data('unit');
      removeCartItem(productId, unit);
    });
  
    $('.clear-cart').click(function () {
      localStorage.removeItem('cart');
      loadCart();
    });
  }
  
  function updateCartItemQuantityFromInput($input) {
    const card = $input.closest('.cart-item');
    const productId = card.data('id');
    const unit = $input.data('unit');
    const quantity = parseInt($input.val());
  
    updateCartItemQuantity(productId, unit, quantity);
  }
  
  function updateCartItemQuantity(productId, unit, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.productId === productId && item.unit === unit);
    if (index >= 0) {
      cart[index].quantity = quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  function removeCartItem(productId, unit) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.productId === productId && item.unit === unit));
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  function toggleCart() {
    window.location.href = 'index.html';
  }
    