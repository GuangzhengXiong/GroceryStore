$(document).ready(function () {
    const fields = ['name', 'email', 'phone', 'address', 'state'];
    const validationStatus = {
      name: false,
      email: false,
      phone: false,
      address: false,
      state: false
    };
  
    function validate() {
      const allValid = Object.values(validationStatus).every(Boolean);
      $('#submit-order').prop('disabled', !allValid);
    }
  
    function showFeedback(id, valid, message) {
      const feedback = $(`#${id}-feedback`);
      feedback.text(message);
      feedback.removeClass('valid invalid');
      feedback.addClass(valid ? 'valid' : 'invalid');
      validationStatus[id] = valid;
      validate();
    }
  
    $('#name').on('blur input', function () {
      const value = $(this).val().trim();
      if (value.length >= 2) {
        showFeedback('name', true, '✓');
      } else if (value !== '') {
        showFeedback('name', false, '✗ Name must be at least 2 characters.');
      }
    });
  
    $('#email').on('blur input', function () {
      const value = $(this).val().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        showFeedback('email', true, '✓');
      } else if (value !== '') {
        showFeedback('email', false, '✗ Please enter a valid email.');
      }
    });
  
    $('#phone').on('blur input', function () {
      const value = $(this).val().trim();
      const phoneRegex = /^[0-9]{8,15}$/;
      if (phoneRegex.test(value)) {
        showFeedback('phone', true, '✓');
      } else if (value !== '') {
        showFeedback('phone', false, '✗ Phone must be 8–15 digits.');
      }
    });
  
    $('#address').on('blur input', function () {
      const value = $(this).val().trim();
      if (value.length >= 5) {
        showFeedback('address', true, '✓');
      } else if (value !== '') {
        showFeedback('address', false, '✗ Address must be at least 5 characters.');
      }
    });
  
    $('#state').on('change', function () {
      const value = $(this).val();
      if (value !== '') {
        showFeedback('state', true, '✓');
      } else {
        showFeedback('state', false, '✗ Please select a state.');
      }
    });
  
    $('#submit-order').click(async function () {
      const customerInfo = {
        name: $('#name').val().trim(),
        email: $('#email').val().trim(),
        phone: $('#phone').val().trim(),
        address: $('#address').val().trim(),
        state: $('#state').val()
      };
  
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }
  
      const response = await fetch('php/submit_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
      });
  
      try {
        const result = await response.json();
        if (result.success) {
          localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
          window.location.href = 'confirmation.html';
        } else {
          alert(result.message);
          window.location.href = 'cart.html';
        }
      } catch (e) {
        alert('Unexpected error during order processing.');
      }
    });
  });

  function goHomeReset() {
    localStorage.removeItem('lastQuery');
    localStorage.removeItem('queryType');
    window.location.href = 'index.html';
  }
    