import random
import string
import time
import pygame
import sys

# Käynnistetään Pygame
pygame.init()

# Asetetaan näyttö ja fontti
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption('Radio Teleskooppi Data')
font = pygame.font.SysFont('Arial', 30)

# Värit
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)

# Funktio, joka luo satunnaisen merkkijonon
def generate_random():
    length = random.randint(3, 10)
    result = []

    prev_char_type = None
    for _ in range(length):
        # Voimme valita kirjaimen, numeron tai erikoismerkin
        char_type = random.choices(["digit", "letter", "special"], weights=[0.4, 0.5, 0.1], k=1)[0]
        
        # Vältetään liian monta peräkkäistä numeroa tai kirjainta
        if prev_char_type == char_type:
            if char_type == "digit":
                char_type = "letter"
            elif char_type == "letter":
                char_type = "digit"
            else:
                char_type = random.choice(["digit", "letter"])
        
        # Lisää satunnainen merkki riippuen tyypistä
        if char_type == "digit":
            result.append(random.choice(string.digits))
        elif char_type == "letter":
            result.append(random.choice(string.ascii_lowercase))
        else:
            result.append(random.choice(string.punctuation))
        
        prev_char_type = char_type
    
    return ''.join(result)

# Funktio, joka simuloi radioteleskoopin signaalin näyttämistä
def display_signal(text):
    screen.fill(WHITE)
    label = font.render(f"Simuloitu signaali: {text}", True, GREEN)
    screen.blit(label, (100, 250))

    if 'a7324js' in text:  # Esimerkki: Tietyt merkkisarjat aktivoivat signaalin
        special_signal = font.render("RADIO SIGNAL DETECTED!", True, RED)
        screen.blit(special_signal, (200, 300))
    
    pygame.display.flip()

def main():
    running = True
    clock = pygame.time.Clock()
    
    while running:
        screen.fill(WHITE)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Generoidaan satunnaisia merkkejä terminaaliin ja Pygame-näyttöön
        random_string = generate_random()
        print(random_string)  # Tulostetaan satunnaiset merkit terminaaliin
        display_signal(random_string)  # Näytetään merkki Pygame-ikkunassa

        # Lisätään pieni tauko simuloidun datan virtaukseen
        time.sleep(0.5)

        # Pygame-ikkunan päivitys
        clock.tick(30)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
