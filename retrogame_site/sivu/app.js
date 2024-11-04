let currentPage = 1;    // Nykyinen sivu
const gamesPerPage = 12; // Näytettävien pelien määrä per sivu
let games = [];         // Talletetaan pelit JSON-tiedostosta

        // Ladataan JSON-tiedosto
        fetch('games.json')
            .then(response => response.json())
            .then(data => {
                games = data.games; // Talletetaan pelit
                displayGames();     // Näytetään pelit ensimmäisellä sivulla
            })
            .catch(error => console.log('Virhe ladattaessa JSON-tiedostoa:', error));

        // Funktio pelien näyttämiseksi nykyisellä sivulla
        function displayGames() {
            const gameInfo = document.getElementById('game-info');
            gameInfo.innerHTML = ''; // Tyhjennetään vanhat tiedot
            const start = (currentPage - 1) * gamesPerPage;
            const end = start + gamesPerPage;
            const currentGames = games.slice(start, end); // Hae pelit nykyiselle sivulle

            // Käydään läpi valitut pelit ja luodaan HTML
            currentGames.forEach(game => {
                gameInfo.innerHTML += `
                    <div class="game-card">
                        <h2>${game.game_name.fi} (${game.launched_year})</h2>
                        <p><strong>Kuvaus:</strong> ${game.description.fi}</p>
                        <p><strong>Valmistaja:</strong> ${game.maker}</p>
                        <p><strong>Julkaisija:</strong> ${game.publisher}</p>
                        <p><strong>Alkuperäiset alustat:</strong> ${game.original_platforms.join(', ')}</p>
                        <a href="halloffame.html?id=${game.ID}" class="hall-of-fame-btn">Näytä Hall of Fame</a>
                    </div>
                `;
            });

            // Päivitetään sivutuspainikkeet
            updatePaginationButtons();
        }

        // Funktio päivittämään sivutuspainikkeet
        function updatePaginationButtons() {
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            // Edellinen-painike on aktiivinen vain, jos ei olla ensimmäisellä sivulla
            if (currentPage === 1) {
                prevBtn.disabled = true;
            } else {
                prevBtn.disabled = false;
            }

            // Seuraava-painike on aktiivinen vain, jos ei olla viimeisellä sivulla
            if (currentPage * gamesPerPage >= games.length) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        }

        // Edellinen-painikkeen tapahtumankuuntelija
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayGames();
            }
        });

        // Seuraava-painikkeen tapahtumankuuntelija
        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentPage * gamesPerPage < games.length) {
                currentPage++;
                displayGames();
            }
        });

 // Otetaan URL-osoitteen parametreista pelin ID, joka on passattu sivulle (esim. ?id=1)
 const urlParams = new URLSearchParams(window.location.search);
 const gameId = urlParams.get('id');  // Haetaan 'id'-parametri

 // Ladataan JSON-tiedosto, joka sisältää pelien tiedot
 fetch('games.json')
     .then(response => response.json())  // Muutetaan vastaus JSON-muotoon
     .then(data => {
         const games = data.games;  // Tallennetaan pelitiedot muuttujaan
         const game = games.find(g => g.ID == gameId);  // Haetaan peli, jonka ID vastaa URL-parametrin arvoa

         // Tarkistetaan, onko pelillä Hall of Fame -listaa
         if (game && game.hall_of_fame && game.hall_of_fame.length > 0) {
             // Lajitellaan Hall of Fame -lista pisteiden perusteella
             const sortedHallOfFame = game.hall_of_fame.sort((a, b) => b.score - a.score);

             // Kolme parasta tulosta
             const topThree = sortedHallOfFame.slice(0, 3);
             
             // Loput tulokset (jos niitä on)
             const remainingResults = sortedHallOfFame.slice(3);

             // Luodaan HTML Hall of Fame -listalle
             let hallOfFameHtml = `<h2>${game.game_name.fi} (${game.launched_year}) - Hall of Fame</h2>`;

             // Näytetään kolme parasta tulosta lihavoituna
             hallOfFameHtml += `<div><h3>Kolme parasta tulosta:</h3><ul>`;
             topThree.forEach(entry => {
                 hallOfFameHtml += `<li><strong>${entry.username} - Score: ${entry.score} (${new Date(entry.date_time).toLocaleDateString()})</strong></li>`;
             });
             hallOfFameHtml += `</ul></div>`;

             // Näytetään loput tulokset, jos niitä on
             if (remainingResults.length > 0) {
                 hallOfFameHtml += `<div><h3>Muut tulokset:</h3><ul>`;
                 remainingResults.forEach(entry => {
                     hallOfFameHtml += `<li>${entry.username} - Score: ${entry.score} (${new Date(entry.date_time).toLocaleDateString()})</li>`;
                 });
                 hallOfFameHtml += `</ul></div>`;
             }

             document.getElementById('hall-of-fame').innerHTML = hallOfFameHtml;  // Asetetaan Hall of Fame HTML-elementtiin
         } else {
             // Jos pelillä ei ole Hall of Fame -listaa, näytetään ilmoitus
             document.getElementById('hall-of-fame').innerHTML = '<p>Ei Hall of Fame -tietoja saatavilla tälle pelille.</p>';
         }
     })
     // Virheenkäsittely: jos JSON-tiedoston lataamisessa on ongelmia, tulostetaan virhe konsoliin
     .catch(error => console.log('Virhe ladattaessa JSON-tiedostoa:', error));
     function getTopScore(hall_of_fame) {
        return Math.max(...hall_of_fame.map(entry => entry.score));
      }
      
      function getTopPlayer(hall_of_fame) {
        const topEntry = hall_of_fame.reduce((prev, current) => (prev.score > current.score) ? prev : current);
        return topEntry.username;
      }
      
      function createPagination() {
        const totalPages = Math.ceil(gamesData.length / gamesPerPage);
        const pagination = document.getElementById('pagination');
        
        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
          <button onclick="goToPage(${i + 1})">${i + 1}</button>
        `).join('');
      }