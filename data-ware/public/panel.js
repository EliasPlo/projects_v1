// Hardcoded credentials for authentication
const validCredentials = {
    username: "admin",
    password: "pass"
};

// Login form submission event listener
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    const adminLink = document.getElementById("admin-link");

    // Check credentials
    if (enteredUsername === validCredentials.username && enteredPassword === validCredentials.password) {
        // Clear error message, hide form, and show admin link
        errorMessage.textContent = "";
        adminLink.style.display = "block";
    } else {
        // Display error message if login fails
        errorMessage.textContent = "Incorrect username or password. Please try again.";
        errorMessage.style.color = "red";
        adminLink.style.display = "none"; // Hide admin link if shown previously
    }
});
