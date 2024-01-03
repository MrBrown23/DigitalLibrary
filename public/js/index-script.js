
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    hamburgerMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
    });


document.addEventListener("DOMContentLoaded", function () {
    const welcomeText = "Welcome to the Library";
    const welcomeElement = document.getElementById('welcome-text');
  
    function typeWelcomeText() {
      let i = 0;
      let typingInterval = setInterval(function () {
        if (i <= welcomeText.length) {
          welcomeElement.innerHTML = welcomeText.slice(0, i);
          i++;
        } else {
          clearInterval(typingInterval);
          welcomeElement.style.overflow = 'visible';
          welcomeElement.style.width = 'auto';
          welcomeElement.querySelector('::after').style.display = 'none';
        }
      }, 150); 
    }
  
    typeWelcomeText();
  });


  document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
  
    loginButton.addEventListener('click', function() {
      window.location.href = 'login.html';
    });
  
    signupButton.addEventListener('click', function() {
      window.location.href = 'signup.html';
    });
  });
  
  