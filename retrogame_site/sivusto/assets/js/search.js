function searchGames() {
    const query = document.getElementById('searchGames').value.toLowerCase();
    const filteredGames = gamesData.filter(game => game.game_name.fi.toLowerCase().includes(query) || game.game_name.en.toLowerCase().includes(query));
    displayFilteredGames(filteredGames);
  }
  
  function displayFilteredGames(filteredGames) {
    const gamesList = document.getElementById('gamesList');
    
    gamesList.innerHTML = filteredGames.map(game => `
      <div class="game">
        <img src="assets/img/${game.game_image || 'default_game_image.png'}" alt="${game.game_name.fi}">
        <h2><a href="peli.html?id=${game.ID}">${game.game_name.fi}</a></h2>
        <p>Paras tulos: ${getTopScore(game.hall_of_fame)} - Voittaja: ${getTopPlayer(game.hall_of_fame)}</p>
      </div>
    `).join('');
  }
  