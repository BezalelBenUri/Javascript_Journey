const usernameAI = document.querySelector('#username');
const phoneAI = document.querySelector('#phone')
const emailAI = document.querySelector('#email');
const passwordAI = document.querySelector('#password');
const confirmPasswordAI = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isPhoneValid = checkPhone()
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isPhoneValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;


    if (isFormValid) {

    }
});



// Utility functions
const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPhoneValid = (phone) => {
    const re = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;
    return re.test(phone);
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};


const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}



// Validating functions

const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const username = usernameAI.value.trim();

    if (!isRequired(username)) {
        showError(usernameAI, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameAI, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameAI);
        valid = true;
    }
    return valid;
}

const checkPhone = () => {
    let valid = false;
    
    const phone = phoneAI.value.trim();
    if (!isRequired(phone)) {
        showError(phoneAI, 'Phone no. cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneAI, 'Phone no. is not valid.')
    } 
    
    else {
        showSuccess(phoneAI);
        valid = true;
    }
    return valid;
}


const checkEmail = () => {
    let valid = false;
    const email = emailAI.value.trim();
    if (!isRequired(email)) {
        showError(emailAI, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailAI, 'Email is not valid.')
    } else {
        showSuccess(emailAI);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {

    let valid = false;

    const password = passwordAI.value.trim();

    if (!isRequired(password)) {
        showError(passwordAI, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordAI, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordAI);
        valid = true;
    }

    return valid;
};


const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordAI.value.trim();
    const password = passwordAI.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordAI, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordAI, 'Confirm password does not match');
    } else {
        showSuccess(confirmPasswordAI);
        valid = true;
    }

    return valid;
};








form.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
});