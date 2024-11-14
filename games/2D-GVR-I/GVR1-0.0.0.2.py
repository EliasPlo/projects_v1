import pygame
import math

pygame.init()

# Näytön koko ja pelinopeus
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
clock = pygame.time.Clock()

# Auton parametrit
car_image = pygame.image.load("car.png")  # Lisää oma auton kuva
car_rect = car_image.get_rect(center=(width//2, height//2))
speed = 0
acceleration = 0.1
deceleration = 0.05
max_speed = 5
rotation_speed = 5
angle = 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Näppäinohjaus
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        speed = min(speed + acceleration, max_speed)
    elif keys[pygame.K_DOWN]:
        speed = max(speed - deceleration, -max_speed / 2)
    else:
        speed *= 0.95  # Kitka

    if keys[pygame.K_LEFT]:
        angle += rotation_speed
    if keys[pygame.K_RIGHT]:
        angle -= rotation_speed

    # Auton liike ja pyöriminen
    car_rect.x += speed * math.sin(math.radians(angle))
    car_rect.y -= speed * math.cos(math.radians(angle))

    # Näytön päivitys
    screen.fill((34, 177, 76))  # Tausta
    rotated_car = pygame.transform.rotate(car_image, angle)
    new_rect = rotated_car.get_rect(center=car_rect.center)
    screen.blit(rotated_car, new_rect.topleft)
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
