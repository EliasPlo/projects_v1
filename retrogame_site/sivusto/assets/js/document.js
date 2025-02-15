document.addEventListener('DOMContentLoaded', function () {
    const loadGameButton = document.getElementById('loadGameButton');
    const gameSelector = document.getElementById('gameSelector');
    const resultsList = document.getElementById('resultsList');
    let gamesData = [];
    let currentEditRow = null;

    // Lataa pelit
    fetch('data/games.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data.games;
            //console.log(gamesData);
            gamesData.forEach(game => {
                const option = document.createElement('option');
                option.value = game.ID;
                option.textContent = game.game_name.fi;
                gameSelector.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Virhe pelitietojen lataamisessa:', error);
        });

    loadGameButton.addEventListener('click', function () {
        const selectedGameId = gameSelector.value;
        console.log('Selected game ID:', selectedGameId);  // Tulosta valittu peli-ID
        //console.log('Games data:', gamesData);
        const selectedGame = gamesData.find(game => String(game.ID) === String(selectedGameId));
        if (selectedGame) {
            //console.log('Selected game:', selectedGame);  // Jos peli löytyy
            displayGame(selectedGame);  // Jatka pelin näyttämistä
        } else {
            console.error('Peliä ei löydy valitulla ID:llä:', selectedGameId);
        }   
    });

    // Lataa peli
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

  // Lisää tai päivitä tulos
  document.getElementById('addScoreForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const score = document.getElementById('score').value;
    const selectedGameId = gameSelector.value;
    const game = gamesData.find(game => String(game.ID) === String(selectedGameId));

    if (game) {
        if (currentEditRow) {
            // Päivitä olemassa oleva rivi
            const rowCells = currentEditRow.cells;
            rowCells[0].innerText = username;
            rowCells[1].innerText = score;
            currentEditRow = null; // Nollaa muokattava rivi
        } else {
            // Lisää uusi rivi
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
        }

        // Tyhjennä lomake
        document.getElementById('addScoreForm').reset();

        // Tallenna uusi tulos games.json-tiedostoon
        saveScoreToFile(game.ID, { username, score });
    }
});

    // Tallenna tulos games.json-tiedostoon
    /*function saveScoreToFile(gameId, scoreData) {
        fetch('data/games.json')
            .then(response => response.json())
            .then(data => {
                const game = data.games.find(g => String(g.ID) === String(gameId));
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
    }*/

            function saveScoreToFile(gameId, scoreData) {
                fetch('/data/games.json', { // Muuta tämä
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    const game = data.games.find(g => String(g.ID) === String(gameId));
                    if (game) {
                        game.hall_of_fame.push({
                            username: scoreData.username,
                            score: scoreData.score,
                            date_time: new Date().toISOString()
                        });
                    }
            
                    // Tee PUT-pyyntö
                    fetch('/data/games.json', {
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
               

    // Poistotoiminto
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