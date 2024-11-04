document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Handle the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Estää oletustoiminnon

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Hae käyttäjätiedot users.json-tiedostosta
            fetch('/data/users.json')
                .then(response => response.json())
                .then(data => {
                    const user = data.users.find(user => user.username === username && user.password === password);
                    
                    if (user) {
                        document.getElementById('loginMessage').innerText = 'Kirjautuminen onnistui!';
                        // Tallenna käyttäjätiedot localStorageen
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                        // Siirry edit.html-sivulle
                        window.location.href = 'edit.html'; 
                    } else {
                        document.getElementById('loginMessage').innerText = 'Virheellinen käyttäjänimi tai salasana.';
                    }
                })
                .catch(error => {
                    console.error('Virhe käyttäjätietojen haussa:', error);
                    document.getElementById('loginMessage').innerText = 'Virhe tietojen hakemisessa.';
                });
        });
    }
});
