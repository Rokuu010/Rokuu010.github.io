<script>
  // Smooth Scrolling
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Alert on Button Click (add a button for this)
  function showAlert() {
    alert('Thanks for visiting!');
  }

  // Modal for Contact Form
  const contactModal = document.createElement('div');
  contactModal.id = 'contactModal';
  contactModal.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required /><br />
        <input type="email" placeholder="Your Email" required /><br />
        <textarea placeholder="Your Message" required></textarea><br />
        <button type="submit">Send</button>
      </form>
      <button id="closeModal">Close</button>
    </div>
  `;
  contactModal.style.display = 'none';
  contactModal.style.position = 'fixed';
  contactModal.style.top = '0';
  contactModal.style.left = '0';
  contactModal.style.width = '100%';
  contactModal.style.height = '100%';
  contactModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  document.body.appendChild(contactModal);

  document.getElementById('contact').addEventListener('click', function() {
    contactModal.style.display = 'block';
  });

  document.getElementById('closeModal').addEventListener('click', function() {
    contactModal.style.display = 'none';
  });
</script>
