document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('#loginButton'); // Login link ID
    const overlay = document.querySelector('#overlay');

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            overlay.classList.add('active'); // Add the active class to show the overlay
            setTimeout(() => {
                window.location.href = loginLink.href; // Navigate after a delay
            }, 1500); // Adjust delay to match the transition duration
        });
    }
});