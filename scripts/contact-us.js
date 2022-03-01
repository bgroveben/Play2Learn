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

function submit() {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('message-sent');
    form.setAttribute('hidden', '');
    message.classList.remove('invisible');
}

window.addEventListener('load', function (e) {
    const form = document.getElementById('contact-form');
    const email = form.email;
    email.dataset.errorMsg = 'Invalid Email';
    const subject = form.subject;
    subject.dataset.errorMsg = 'Subject must be ' + subject.minLength + ' to ' + subject.maxLength + ' characters.';
    const message = form.message;
    message.dataset.errorMsg = 'Your message must be between ' + message.minLength + ' and ' + message.maxLength + ' characters.';
    const messageSent = document.getElementById('message-sent');

    subject.addEventListener("input", function (e) {
        checkField(subject);
    });

    email.addEventListener("input", function (e) {
        checkField(email);
    });

    message.addEventListener("input", function (e) {
        checkField(message);
    });

    form.addEventListener("submit", function (e) {
        checkField(subject);
        checkField(email);
        checkField(message);

        if (!form.checkValidity()) {
            e.preventDefault();
            alert('Please fix form errors.');
        } else {
            submit(messageSent);
        }
    });
});