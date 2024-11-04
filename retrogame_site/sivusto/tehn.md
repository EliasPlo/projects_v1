


        .then(data => {
          const game = data.games.find(g => g.ID === gameId);
          if (game) {
              document.getElementById('gameName').innerText = game.game_name.fi;
              document.getElementById('gameImage').src = `assets/img/${game.game_image}`;
              
              // Täytetään tulokset
              const scoresList = document.getElementById('scoresList');
              game.hall_of_fame.sort((a, b) => b.score - a.score); // Järjestetään tulokset laskevasti
              game.hall_of_fame.forEach((score, index) => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${index + 1}</td>
                      <td>${score.username}</td>
                      <td>${score.score}</td>
                      <td>${new Date(score.date_time).toLocaleDateString()}</td>
                  `;
                  scoresList.appendChild(row);
              });

              // Lisätietojen napin toiminnallisuus
              const moreInfoButton = document.getElementById('moreInfoButton');
              moreInfoButton.addEventListener('click', () => {
                  document.getElementById('gameInfo').style.display = 'block';
                  document.getElementById('gameMaker').innerText = game.maker;
                  document.getElementById('gamePublisher').innerText = game.publisher;
                  document.getElementById('gameReleaseYear').innerText = game.launched_year;
              });
          }
      })

            .catch(error => {
        console.error('Virhe pelin tietojen hakemisessa:', error);
    });



    .then(data => {
      // Etsitään peli ID:n perusteella
      const game = data.games.find(g => g.ID === gameId);
      
      // Tarkistetaan, löytyykö peli
      if (game) {
          // Näytetään pelin tiedot
          displayGameDetails(game); // Call the function to display game details
  
          document.getElementById('gameName').innerText = game.game_name.fi;
          document.getElementById('gameImage').src = `assets/img/${game.game_image}`;
  
          // Tulosten täyttäminen
          const scoresList = document.getElementById('scoresList');
          scoresList.innerHTML = ''; // Tyhjennetään aikaisemmat tulokset
          game.hall_of_fame.sort((a, b) => b.score - a.score); // Järjestetään tulokset laskevasti
  
          // Lisätään tulokset taulukkoon
          game.hall_of_fame.forEach((score, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${score.username}</td>
                  <td>${score.score}</td>
                  <td>${new Date(score.date_time).toLocaleDateString()}</td>
              `;
              scoresList.appendChild(row);
          });
  
          // Kutsutaan displayResults-funktiota tulosten näyttämiseksi
          const gameResults = game.hall_of_fame; // Tallennetaan tulokset
          displayResults(gameResults); // Call the function to display results
  
          // Lisätietojen napin toiminnallisuus
          const moreInfoButton = document.getElementById('moreInfoButton');
          moreInfoButton.addEventListener('click', () => {
              // Näytetään pelin lisätiedot
              document.getElementById('gameInfo').style.display = 'block';
              document.getElementById('gameMaker').innerText = game.maker;
              document.getElementById('gamePublisher').innerText = game.publisher;
              document.getElementById('gameReleaseYear').innerText = game.launched_year;
          });
      }
  })
  .catch(error => {
      console.error("Virhe pelitietojen lataamisessa:", error);





      