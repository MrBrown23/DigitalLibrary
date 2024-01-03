// Example starter JavaScript for disabling form submissions if there are invalid fields
function submitForm(){
    var getPass1 = document.getElementById("password");
    var getPass2 = document.getElementById("passwordV");
    if(getPass1.value == getPass2.value && getPass1.value != ""){
      getPass2.classList.remove("is-invalid");
      getPass2.classList.remove("border-danger");
      document.forms["signupForm"].submit();
    }
    else {
      // window.alert("Please enter the same password");
      getPass2.classList.add("is-invalid");
      getPass2.classList.add("border-danger");
      if(getPass2.value != "")
      document.getElementById("checkPassword").innerHTML = "Password not matching.";
    }
  }

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()