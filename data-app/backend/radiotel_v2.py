import random
import string
import json
import time
import pygame

# Ladataan data.json tiedosto ja puretaan se
with open('data.json', 'r') as f:
    data_dict = json.load(f)

# Pygame alustukset
pygame.init()

# Asetetaan ikkunan koko ja otsikko
window_width = 800
window_height = 600
window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption('Radio Telescope Data Simulation')

# Värit
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLACK = (0, 0, 0)

# Fontti asetukset
font = pygame.font.SysFont('Arial', 24)

# Funktio satunnaisen merkkijonon luomiseksi
def generate_random():
    length = random.randint(6, 8)  # Pituus 6-8 merkkiä
    result = []
    
    for _ in range(length):
        char_type = random.choices(["digit", "letter"], weights=[0.4, 0.6], k=1)[0]
        if char_type == "digit":
            result.append(random.choice(string.digits))
        else:
            result.append(random.choice(string.ascii_lowercase))
    
    return ''.join(result)

# Funktio, joka käsittelee ja näyttää tulokset pygame-ikkunassa
def display_data_on_screen(signal, explanation):
    window.fill(BLACK)
    
    # Näytetään signaali ja selite
    signal_text = font.render(f"Signal: {signal}", True, GREEN)
    explanation_text = font.render(f"Explanation: {explanation}", True, RED)
    
    # Asetetaan tekstin sijainti ja näytetään se
    window.blit(signal_text, (50, 50))
    window.blit(explanation_text, (50, 100))
    
    pygame.display.update()

# Päälooppi
def main():
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Generoidaan satunnainen signaali
        signal = generate_random()
        
        # Tarkistetaan, onko signaalilla vastaavaa selitystä data.json:ista
        explanation = data_dict.get(signal, None)
        
        # Jos selitys löytyy, näytetään se pygame-ikkunassa
        if explanation:
            display_data_on_screen(signal, explanation)
        
        # Simuloidaan satunnaista dataa terminaaliin
        print(signal)
        
        # Viive ennen seuraavaa merkkiä
        time.sleep(0.5)
        
        # Suljetaan pygame ikkuna, jos sovellus suljetaan
        if not running:
            pygame.quit()

if __name__ == "__main__":
    main()
