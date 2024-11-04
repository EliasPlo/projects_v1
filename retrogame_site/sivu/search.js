function searchGames() {
    const query = document.getElementById('searchGames').value.toLowerCase();
    const filteredGames = gamesData.filter(game => game.game_name.fi.toLowerCase().includes(query) || game.game_name.en.toLowerCase().includes(query));
    displayFilteredGames(filteredGames);
  }
  
  function displayFilteredGames(filteredGames) {
    const gamesList = document.getElementById('games-grid');
    
    gamesList.innerHTML = filteredGames.map(game => `
      <div class="game">
        <h2><a href="halloffame.html?id=${game.ID}">${game.game_name.fi}</a></h2>
        <p>Paras tulos: ${getTopScore(game.hall_of_fame)} - Voittaja: ${getTopPlayer(game.hall_of_fame)}</p>
      </div>
    `).join('');
  }
  