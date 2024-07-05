document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
    const toastElement = document.querySelector('.toast');
  
    function showToast() {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  
    feedbackForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      showToast();
      feedbackForm.reset();
    });
  });
  