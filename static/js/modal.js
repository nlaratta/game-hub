document.addEventListener('DOMContentLoaded', function() {
    // Get the modals
    const signUpModal = document.getElementById("signUpModal");
    const loginModal = document.getElementById("loginModal");

    // Get the buttons that open the modals
    const signUpBtn = document.getElementById("signUpBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Get the <span> elements that close the modals
    const closeButtons = document.getElementsByClassName("close");

    // Function to open a modal
    function openModal(modal) {
        modal.style.display = "block";
    }

    // Function to close a modal
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // When the user clicks the button, open the modal 
    signUpBtn.onclick = function() {
        openModal(signUpModal);
    }

    loginBtn.onclick = function() {
        openModal(loginModal);
    }

    // When the user clicks on <span> (x), close the modal
    for (let closeButton of closeButtons) {
        closeButton.onclick = function() {
            closeModal(this.closest('.modal'));
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    }

    // Handle sign up form submission
    document.getElementById("signUpForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;

        fetch('/accounts/register/', {
            method: 'POST',
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                closeModal(signUpModal);
                updateAuthUI(true);
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        });
    });

    // Handle login form submission
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;

        fetch('/accounts/login/', {
            method: 'POST',
            body: new URLSearchParams({
                'username': username,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful!');
                closeModal(loginModal);
                updateAuthUI(true);
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
    });

    // Handle logout
    logoutBtn.addEventListener("click", function() {
        fetch('/accounts/logout/', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Logged out successfully!');
                updateAuthUI(false);
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during logout.');
        });
    });

    // Function to update UI based on auth state
    function updateAuthUI(isLoggedIn) {
        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            signUpBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            loginBtn.style.display = 'inline-block';
            signUpBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }

    // Check auth state on page load
    fetch('/accounts/check_auth/')
    .then(response => response.json())
    .then(data => {
        updateAuthUI(data.is_authenticated);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
