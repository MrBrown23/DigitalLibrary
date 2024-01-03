function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if the 'error' parameter is present and its value is 'invalid'
const errorParam = getUrlParameter('error');
if (errorParam === 'invalid') {
    // Show the error message using Bootstrap classes
    $('#errorMessage').fadeIn();
}
