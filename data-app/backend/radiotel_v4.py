import random
import string
import json
import time
import pygame
from datetime import datetime

# Ladataan data.json tiedosto ja puretaan se
with open('data.json', 'r') as f:
    data_dict = json.load(f)

# Pygame alustukset
pygame.init()

# Asetetaan ikkunan koot ja otsikot
window_width = 800
window_height = 600
window_main = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption('Radio Telescope Data Simulation')

window_results = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption('Results Viewer')

# Värit
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)

# Fontti asetukset
font = pygame.font.SysFont('Arial', 24)

# Funktio satunnaisen merkkijonon luomiseksi
def generate_random():
    length = random.randint(2, 2)  # Pituus 6-8 merkkiä
    result = []
    
    for _ in range(length):
        char_type = random.choices(["digit", "letter"], weights=[0.4, 0.6], k=1)[0]
        if char_type == "digit":
            result.append(random.choice(string.digits))
        else:
            result.append(random.choice(string.ascii_lowercase))
    
    return ''.join(result)

# Funktio, joka käsittelee ja näyttää tulokset pääikkunassa
def display_data_on_main_screen(signal, explanation):
    window_main.fill(BLACK)
    
    # Näytetään signaali ja selite
    signal_text = font.render(f"Signal: {signal}", True, GREEN)
    explanation_text = font.render(f"Explanation: {explanation}", True, RED)
    
    # Asetetaan tekstin sijainti ja näytetään se
    window_main.blit(signal_text, (50, 50))
    window_main.blit(explanation_text, (50, 100))
    
    pygame.display.update()

# Funktio, joka tallentaa signaalin tiedot results.json tiedostoon
def save_signal_to_results(signal, explanation):
    result = {
        "signal": signal,
        "explanation": explanation,
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "epoch_time": int(time.time())
    }
    
    # Ladataan nykyinen results.json tiedosto, jos se on olemassa, tai luodaan uusi lista
    try:
        with open('results.json', 'r') as f:
            results = json.load(f)
    except FileNotFoundError:
        results = []

    # Lisätään uusi signaali tuloksiin
    results.append(result)

    # Tallennetaan tiedot takaisin results.json tiedostoon
    with open('results.json', 'w') as f:
        json.dump(results, f, indent=4)

# Funktio, joka näyttää results.json tiedoston tiedot erillisessä ikkunassa
def display_results_window():
    window_results.fill(BLACK)
    
    # Ladataan results.json tiedoston tiedot
    try:
        with open('results.json', 'r') as f:
            results = json.load(f)
    except FileNotFoundError:
        results = []

    # Listataan tiedot pygame-ikkunaan
    y_offset = 50
    for result in results:
        result_text = font.render(
            f"{result['timestamp']}: {result['signal']} - {result['explanation']}",
            True,
            WHITE
        )
        window_results.blit(result_text, (50, y_offset))
        y_offset += 30
    
    pygame.display.update()

# Päälooppi
def main():
    running = True
    clock = pygame.time.Clock()
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Generoidaan satunnainen signaali
        signal = generate_random()
        
        # Tarkistetaan, onko signaalilla vastaavaa selitystä data.json:ista
        explanation = data_dict.get(signal, None)
        
        # Jos selitys löytyy, näytetään se pääikkunassa ja tallennetaan tiedot
        if explanation:
            display_data_on_main_screen(signal, explanation)
            save_signal_to_results(signal, explanation)
            display_results_window()  # Päivitä results-ikkuna
        
        # Simuloidaan satunnaista dataa terminaaliin
        print(signal)
        
        # Päivitetään results-ikkuna aina
        display_results_window()
        
        # Viive ennen seuraavaa merkkiä
        time.sleep(0.5)
        
        # Suljetaan pygame ikkunat, jos sovellus suljetaan
        if not running:
            pygame.quit()
            break

        # Päivitysnopeuden hallinta
        clock.tick(60)

if __name__ == "__main__":
    main()
