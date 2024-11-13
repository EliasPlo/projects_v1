import pygame
import sys

# Pygamen alustaminen
pygame.init()

# Pelin asetukset
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption('Asetus 1')

# Värit
WHITE = (255, 255, 0)
BLACK = (0, 0, 0)

# Ajoneuvo
car_width = 50
car_height = 100
car_x = screen_width // 2 - car_width // 2
car_y = screen_height - car_height - 10
car_speed = 5

# Peli loop
clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Näppäinkontrollit
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        car_x -= car_speed
    if keys[pygame.K_RIGHT]:
        car_x += car_speed

    # Rajoita auton liikkumista näytön ulkopuolelle
    if car_x < 0:
        car_x = 0
    if car_x > screen_width - car_width:
        car_x = screen_width - car_width

    # Taustaväri
    screen.fill(WHITE)

    # Piirrä auto
    pygame.draw.rect(screen, BLACK, (car_x, car_y, car_width, car_height))

    # Päivitä näyttö
    pygame.display.update()

    # Ohjaa peliä 60 fps
    clock.tick(30)

# Sulje peli
pygame.quit()
sys.exit()
