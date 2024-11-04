let gameResults = [];

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  //const gameId = 1;

  fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
      const game = data.games.find(game => game.ID == gameId);
      if (game) {
        displayGameDetails(game);
        gameResults = game.hall_of_fame;
        displayResults(gameResults);
      } else {
        console.error('Game not found');
    } 
    });
  });
  

function displayGameDetails(game) {
  document.getElementById('gameTitle').textContent = game.game_name.fi;
  //document.getElementById('gameImage').src = `assets/img/${game.game_image || 'default_game_image.png'}`;
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  results.sort((a, b) => b.score - a.score);
  
  resultsContainer.innerHTML = results.slice(0, 20).map((result, index) => `
    <div class="player-result ${index < 3 ? 'highlight' : ''}">
      <p>${index + 1}. ${result.username} - ${result.score} (${new Date(result.date_time).toLocaleDateString()})</p>
    </div>
  `).join('');
}

function searchPlayers() {
  const query = document.getElementById('searchPlayers').value.toLowerCase();
  const filteredPlayers = gameResults.filter(result => result.username.toLowerCase().includes(query));
  
  displayResults(filteredPlayers);
}
