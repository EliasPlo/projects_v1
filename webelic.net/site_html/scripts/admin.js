fetch('data/admins.json')
    .then(response => response.json())
    .then(admins => {
        const adminControls = document.getElementById('admin-controls');
        adminControls.innerHTML = `<h2>Adminit</h2>
        <ul>${admins.admins.map(admin => `<li>${admin.name} (${admin.role})</li>`).join('')}</ul>`;
    });