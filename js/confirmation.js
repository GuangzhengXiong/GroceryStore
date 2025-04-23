document.addEventListener('DOMContentLoaded', function () {
    const info = JSON.parse(localStorage.getItem('customerInfo')) || {};
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const total = cart.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);
  
    document.getElementById('email-message').innerHTML =
      `We have sent a confirmation email to <strong>${info.email}</strong>.`;
  
    document.getElementById('order-message').innerHTML =
      `Your order worth <strong>$${total.toFixed(2)}</strong> has been successfully placed.`;
  
    document.getElementById('delivery-message').innerHTML =
      `It will be delivered to <strong>${info.address}, ${info.state}</strong> within 2–5 business days.`;
  
    const list = document.getElementById('order-summary');
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} (${item.unit}) - $${parseFloat(item.price).toFixed(2)} × ${item.quantity}`;
      list.appendChild(li);
    });
  
    document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
  
    localStorage.removeItem('cart');
    localStorage.removeItem('customerInfo');
  });

  function goHomeReset() {
    localStorage.removeItem('lastQuery');
    localStorage.removeItem('queryType');
    window.location.href = 'index.html';
  }
