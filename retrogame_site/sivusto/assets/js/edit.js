document.addEventListener('DOMContentLoaded', function () {
    const loadGameButton = document.getElementById('loadGameButton');
    const additionalGamesContainer = document.getElementById('additionalGames');

    loadGameButton.addEventListener('click', function () {
        fetch('data/games.json')
            .then(response => response.json())
            .then(data => {
                const game = data.games[0];
                displayGame(game);
                
                for (let i = 1; i < data.games.length; i++) {
                    const additionalGame = data.games[i];
                    displayAdditionalGame(additionalGame);
                }
            })
            .catch(error => {
                console.error('Virhe pelitietojen lataamisessa:', error);
            });
    });
    
    function displayGame(game) {
        document.getElementById('editGameName').innerText = game.game_name.fi;
        
        const resultsList = document.getElementById('resultsList');
        resultsList.innerHTML = ''; // Tyhjennetään lista ennen lataamista
        
        game.hall_of_fame.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.username}</td>
                <td>${score.score}</td>
                <td>${new Date(score.date_time).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn">Muokkaa</button>
                    <button class="delete-btn">Poista</button>
                </td>
            `;
            resultsList.appendChild(row);
        });

        document.getElementById('editResults').style.display = 'block'; // Näytetään tulokset
    }

    function displayAdditionalGame(game) {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game-container';
        gameDiv.innerHTML = `
            <h2>Peli: ${game.game_name.fi}</h2>
            <h3>Tulokset</h3>
            <table>
                <thead>
                    <tr>
                        <th>Käyttäjänimi</th>
                        <th>Tulos</th>
                        <th>Päivämäärä</th>
                        <th>Toiminnot</th>
                    </tr>
                </thead>
                <tbody id="resultsList-${game.ID}"></tbody>
            </table>
            <h3>Lisää uusi tulos</h3>
            <form id="addScoreForm-${game.ID}">
                <label for="username-${game.ID}">Käyttäjänimi:</label>
                <input type="text" id="username-${game.ID}" required>
                
                <label for="score-${game.ID}">Tulos:</label>
                <input type="number" id="score-${game.ID}" required>
                
                <button type="submit">Lisää Tulos</button>
            </form>
        `;
        additionalGamesContainer.appendChild(gameDiv);
        
        // Lataa ja näytä tulokset
        const resultsList = document.getElementById(`resultsList-${game.ID}`);
        game.hall_of_fame.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.username}</td>
                <td>${score.score}</td>
                <td>${new Date(score.date_time).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn">Muokkaa</button>
                    <button class="delete-btn">Poista</button>
                </td>
            `;
            resultsList.appendChild(row);
        });

        // Lisää tapahtuma formille
        const form = document.getElementById(`addScoreForm-${game.ID}`);
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Estää oletustoiminnon

            const username = document.getElementById(`username-${game.ID}`).value;
            const score = document.getElementById(`score-${game.ID}`).value;

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${username}</td>
                <td>${score}</td>
                <td>${new Date().toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn">Muokkaa</button>
                    <button class="delete-btn">Poista</button>
                </td>
            `;
            resultsList.appendChild(newRow);
            
            // Tyhjennä lomake
            form.reset();

            // Tallenna uusi tulos games.json-tiedostoon
            saveScoreToFile(game.ID, { username, score });
        });
    }

    // Tallenna tulos games.json-tiedostoon
    function saveScoreToFile(gameId, scoreData) {
        fetch('data/games.json')
            .then(response => response.json())
            .then(data => {
                const game = data.games.find(g => g.ID === gameId);
                if (game) {
                    game.hall_of_fame.push({
                        username: scoreData.username,
                        score: scoreData.score,
                        date_time: new Date().toISOString()
                    });
                }

                fetch('data/games.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Tulokset tallennettu onnistuneesti.');
                    } else {
                        console.error('Virhe tulosten tallentamisessa.');
                    }
                })
                .catch(error => {
                    console.error('Virhe:', error);
                });
            })
            .catch(error => {
                console.error('Virhe pelitietojen lataamisessa:', error);
            });
    }

    // Poistotoiminto (lisätty dynaamisesti)
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            row.remove();
        } else if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const username = row.cells[0].innerText;
            const score = row.cells[1].innerText;

            document.getElementById('username').value = username;
            document.getElementById('score').value = score;
        }
    });
});
