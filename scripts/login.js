function addError(field) {
    if (field.previousElementSibling &&
        field.previousElementSibling.className === 'error') {
        return;
    }
    const error = document.createElement('div');
    error.innerHTML = '&#x26A1; ' +
        field.dataset.errorMsg;
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
    const registrationForm = document.getElementById('registration-form');
    const registrationMessage = document.getElementById('registration-confirm');
    registrationForm.setAttribute('hidden', '');
    registrationMessage.classList.remove('invisible');
}

function loginSubmit() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-confirm');
    loginForm.setAttribute('hidden', '');
    loginMessage.classList.remove('invisible');
}

function confirmPassword() {
    let firstPassword = document.getElementById('pw');
    let secondPassword = document.getElementById('pw2');
    if (firstPassword.value == secondPassword.value) {
        removeError(secondPassword)
        checkField(secondPassword);
    } else {
        addError(secondPassword);
    }
}

window.addEventListener('load', function (e) {

    const loginForm = document.getElementById('login-form');
    const loginConfirm = document.getElementById('login-confirm');
    const loginLink = document.getElementById('loginlink');
    const loginUsername = document.getElementById('login-username');
    loginUsername.dataset.errorMsg = 'Username must be 8 to 25 characters.';
    const pw = document.getElementById('login-password');
    pw.dataset.errorMsg = pw.title;

    const registrationForm = document.getElementById('registration-form');
    const registrationConfirm = document.getElementById('registration-confirm');
    const registerLink = document.getElementById('registerlink');
    const registerEmail = document.getElementById('register-email');
    registerEmail.dataset.errorMsg = 'Invalid email address.';
    const password1 = registrationForm.pw;
    password1.dataset.errorMsg = password1.title;
    const password2 = registrationForm.pw2;
    password2.dataset.errorMsg = password2.title;
    const registerUsername = document.getElementById("register-username");
    registerUsername.dataset.errorMsg = 'Username must be 8 to 25 characters.';
    const terms = registrationForm.terms;
    terms.dataset.errorMsg = 'You must accept the terms.';

    registerUsername.addEventListener("input", function (e) {
        checkField(registerUsername);
    });

    registerEmail.addEventListener("input", function (e) {
        checkField(registerEmail);
    });

    password1.addEventListener("input", function (e) {
        checkField(password1);
    });

    password2.addEventListener("input", function (e) {
        confirmPassword();
    });

    terms.addEventListener("input", function (e) {
        checkField(terms);
    });

    loginUsername.addEventListener("input", function (e) {
        checkField(loginUsername);
    });

    pw.addEventListener("input", function (e) {
        checkField(pw);
    });

    loginForm.addEventListener("submit", function (e) {
        checkField(loginUsername);
        checkField(pw);

        if (!loginForm.checkValidity()) {
            e.preventDefault();
            alert('Please fix form errors.');
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
        checkField(registerEmail);
        checkField(password1);
        confirmPassword();
        checkField(terms);

        if (!registrationForm.checkValidity()) {
            e.preventDefault();
            alert('Please fix form errors.');
        } else {
            registrationSubmit(registrationConfirm);
        }
    });
});