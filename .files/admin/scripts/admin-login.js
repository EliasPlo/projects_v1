document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('../data/admins.json')
        .then(response => response.json())
        .then(data => {
            const admin = data.admins.find(a => a.email === email && a.password === password);

            if (admin) {
                localStorage.setItem('admin', JSON.stringify(admin));
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        })
        .catch(error => console.error('Virhe kirjautumisessa:', error));
});
