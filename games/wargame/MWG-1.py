import pygame
import random

# Alusta Pygame
pygame.init()

# Pelin asetukset
screen_width = 800
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("2D Taistelupeli")

# Värit
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Peliin liittyvät muuttujat
clock = pygame.time.Clock()
running = True

# Pelin pääsilmukka
while running:
    screen.fill(WHITE)  # Täytetään tausta valkoiseksi
    
    # Tarkista tapahtumat
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    pygame.display.flip()  # Päivitetään näyttö
    clock.tick(60)  # Pelin päivitystaajuus (60 FPS)

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(BLACK)
        self.rect = self.image.get_rect()
        self.rect.center = (screen_width // 2, screen_height // 2)
        self.speed = 5

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT]:
            self.rect.x += self.speed
        if keys[pygame.K_UP]:
            self.rect.y -= self.speed
        if keys[pygame.K_DOWN]:
            self.rect.y += self.speed

# Pelaaja-olio
player = Player()

# Ryhmä pelaajan ja muiden hahmojen tallentamiseen
all_sprites = pygame.sprite.Group()
all_sprites.add(player)

# Peli pääsilmukka
while running:
    screen.fill(WHITE)

    # Tarkista tapahtumat
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Päivitetään pelaajaa ja piirtämme sen
    all_sprites.update()
    all_sprites.draw(screen)

    pygame.display.flip()  # Päivitetään näyttö
    clock.tick(60)  # Pelin päivitystaajuus (60 FPS)

class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill((255, 0, 0))  # Punainen väri viholliselle
        self.rect = self.image.get_rect()
        self.rect.center = (random.randint(0, screen_width), random.randint(0, screen_height))
        self.speed = 2

    def update(self):
        # Liikkumista satunnaisesti
        self.rect.x += random.choice([-1, 0, 1]) * self.speed
        self.rect.y += random.choice([-1, 0, 1]) * self.speed
        
        # Pidetään vihollinen ruudun sisällä
        if self.rect.x < 0:
            self.rect.x = 0
        if self.rect.x > screen_width - self.rect.width:
            self.rect.x = screen_width - self.rect.width
        if self.rect.y < 0:
            self.rect.y = 0
        if self.rect.y > screen_height - self.rect.height:
            self.rect.y = screen_height - self.rect.height

# Luodaan vihollisia
enemies = pygame.sprite.Group()
for _ in range(5):  # Luodaan 5 vihollista
    enemy = Enemy()
    enemies.add(enemy)
    all_sprites.add(enemy)

# Peli pääsilmukka
while running:
    screen.fill(WHITE)

    # Tarkista tapahtumat
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Päivitetään kaikki sprite-objektit
    all_sprites.update()
    all_sprites.draw(screen)

    pygame.display.flip()  # Päivitetään näyttö
    clock.tick(60)  # Pelin päivitystaajuus (60 FPS)

class Attack(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((10, 10))
        self.image.fill((0, 255, 0))  # Vihreä väri hyökkäykselle
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.speed = 10

    def update(self):
        self.rect.x += self.speed
        if self.rect.x > screen_width:
            self.kill()  # Poistaa hyökkäyksen, kun se menee ruudun ulkopuolelle

# Pelaajan hyökkäys
def player_attack():
    attack = Attack(player.rect.centerx, player.rect.centery)
    all_sprites.add(attack)

# Peli pääsilmukka
while running:
    screen.fill(WHITE)

    # Tarkista tapahtumat
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_a:  # A-näppäimellä hyökkäys
                player_attack()

    # Päivitetään kaikki sprite-objektit
    all_sprites.update()
    all_sprites.draw(screen)

    pygame.display.flip()  # Päivitetään näyttö
    clock.tick(60)  # Pelin päivitystaajuus (60 FPS)

pygame.quit()
