function addError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    // error message already showing
    return;
  }
  const error = document.createElement('div');
  error.innerHTML = '&#x26A1; '
    + field.dataset.errorMsg;
  error.className = 'error';
  field.parentNode.insertBefore(error, field);  
}

function removeError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    field.previousElementSibling.remove();
  }
}

function checkField(field) {
  if (!field.checkValidity()) {
    addError(field);
  } else {
    removeError(field);
  }
}

function registrationSubmit() {
  const registrationForm  = document.getElementById('registration-form');
  const registrationMessage = document.getElementById('registration-confirm');
  registrationForm.setAttribute('hidden', '');
  registrationMessage.classList.remove('invisible');
}

function loginSubmit() {
  const loginForm  = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-confirm');
  loginForm.setAttribute('hidden', '');
  loginMessage.classList.remove('invisible');
}



function confirmPassword() {
  let firstPassword = document.getElementById('pw');
  let secondPassword = document.getElementById('pw2');
  // alert(firstPassword.value);
  // alert(secondPassword.value);
  if (firstPassword.value == secondPassword.value) {
    // addError(secondPassword);
    removeError(secondPassword)
    checkField(secondPassword);
  } else {
    // checkField(secondPassword);
    addError(secondPassword);
  }
}

window.addEventListener('load', function(e) {

  const loginForm = document.getElementById('login-form');
  const loginConfirm = document.getElementById('login-confirm');
  const loginLink = document.getElementById('loginlink');
  const loginUsername = document.getElementById('login-username');
  loginUsername.dataset.errorMsg = 'Username must be 8 to 25 characters.';
  const pw = document.getElementById('login-password');
  pw.dataset.errorMsg = pw.title;

  const registrationForm  = document.getElementById('registration-form');
  const registrationConfirm = document.getElementById('registration-confirm');
  const registerLink = document.getElementById('registerlink');
  const email = registrationForm.email;
  email.dataset.errorMsg = 'Invalid Email';
  const password1 = registrationForm.pw;
  password1.dataset.errorMsg = password1.title;
  const password2 = registrationForm.pw2;
  password2.dataset.errorMsg = password2.title;
  const registerUsername = document.getElementById("register-username");
  registerUsername.dataset.errorMsg = 'Username must be 8 to 25 characters.';
  const terms = registrationForm.terms;
  terms.dataset.errorMsg = 'You must accept the terms.';

  registerUsername.addEventListener("input", function(e) {
    checkField(registerUsername);
  });

  email.addEventListener("input", function(e) {
    checkField(email);
  });

  password1.addEventListener("input", function(e) {
    checkField(password1);
  });
  
  password2.addEventListener("input", function(e) {
    confirmPassword();
    // checkField(password2);
  });


// https://express-validator.github.io/docs/custom-validators-sanitizers.html
/* Match passwords  
  password2.addEventListener("input", function(e) {
    if (password1 == password2) {
      checkField(password2);
    } else {
      addError(password2);
    }
  });
*/

  terms.addEventListener("input", function(e) {
    checkField(terms);
  });

  loginUsername.addEventListener("input", function(e) {
    checkField(loginUsername);
  });

  pw.addEventListener("input", function(e) {
    checkField(pw);
  });

  loginForm.addEventListener("submit", function(e) {
    checkField(loginUsername);
    checkField(pw);
    
    // If form is invalid, prevent submission
    if (!loginForm.checkValidity()) {
      e.preventDefault();
      alert('Please fix form errors.');
    // Otherwise, display notice that the message was sent
    } else {
      loginSubmit(loginConfirm);
    }
  });

  registerLink.addEventListener('click', register);
  function register() {
    registrationForm.classList.replace("invisible", "visible");
    loginForm.classList.replace("visible", "invisible");
  }
  
  loginLink.addEventListener('click', logIn);
  function logIn() {
    registrationForm.classList.replace("visible", "invisible");
    loginForm.classList.replace("invisible", "visible");
  }

  registrationForm.addEventListener("submit", function(e) {
    checkField(registerUsername);
    checkField(email);
    checkField(password1);
    confirmPassword();
    // checkField(password2);
    checkField(terms);
    
    // If form is invalid, prevent submission
    if (!registrationForm.checkValidity()) {
      e.preventDefault();
      alert('Please fix form errors.');
    // Otherwise, display notice that the message was sent
    } else {
      registrationSubmit(registrationConfirm);
    }
  });
});