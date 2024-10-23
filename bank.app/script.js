let users, accounts, loans, currentUser;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/users.json')
        .then(response => response.json())
        .then(data => users = data);
    
    fetch('data/accounts.json')
        .then(response => response.json())
        .then(data => accounts = data);
    
    fetch('data/loans.json')
        .then(response => response.json())
        .then(data => loans = data);
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').innerText = user.name;
        updateAccountInfo();
        updateLoanInfo();
    } else {
        alert('Virheellinen käyttäjätunnus tai salasana');
    }
}

function updateAccountInfo() {
    const account = accounts.find(a => a.userId === currentUser.id);
    document.getElementById('account-balance').innerText = account.balance + ' €';
}

function updateLoanInfo() {
    const loan = loans.find(l => l.userId === currentUser.id);
    if (loan) {
        document.getElementById('loan-info').innerHTML = `
            Lainamäärä: ${loan.loanAmount} €<br>
            Jäljellä oleva velka: ${loan.loanBalance} €<br>
            Korko: ${loan.interestRate} %
        `;
    } else {
        document.getElementById('loan-info').innerText = 'Ei lainaa';
    }
}

function deposit() {
    const amount = parseFloat(prompt('Syötä talletettava summa:'));
    if (amount && amount > 0) {
        const account = accounts.find(a => a.userId === currentUser.id);
        account.balance += amount;
        updateAccountInfo();
        alert('Talletus onnistui');
    } else {
        alert('Virheellinen summa');
    }
}

function withdraw() {
    const amount = parseFloat(prompt('Syötä nostettava summa:'));
    if (amount && amount > 0) {
        const account = accounts.find(a => a.userId === currentUser.id);
        if (account.balance >= amount) {
            account.balance -= amount;
            updateAccountInfo();
            alert('Nosto onnistui');
        } else {
            alert('Tilillä ei ole tarpeeksi rahaa');
        }
    } else {
        alert('Virheellinen summa');
    }
}

function takeLoan() {
    const loanAmount = parseFloat(prompt('Syötä lainasumma:'));
    if (loanAmount && loanAmount > 0) {
        const existingLoan = loans.find(l => l.userId === currentUser.id);
        if (existingLoan) {
            alert('Sinulla on jo laina.');
        } else {
            const newLoan = {
                userId: currentUser.id,
                loanAmount: loanAmount,
                loanBalance: loanAmount,
                loanDate: new Date().toISOString().split('T')[0],
                interestRate: 3.0
            };
            loans.push(newLoan);
            updateLoanInfo();
            alert('Laina myönnetty');
        }
    } else {
        alert('Virheellinen summa');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}
