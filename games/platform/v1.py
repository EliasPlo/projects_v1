import pygame
import sys

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (0, 0, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)

# Initialize screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tasohyppelypeli")
clock = pygame.time.Clock()

# Classes
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(BLUE)
        self.rect = self.image.get_rect()
        self.rect.topleft = (50, 500)
        self.vel_y = 0
        self.jumping = False

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.rect.x -= 5
        if keys[pygame.K_RIGHT]:
            self.rect.x += 5

        # Gravity
        self.vel_y += 1
        if self.vel_y > 10:
            self.vel_y = 10
        self.rect.y += self.vel_y

        # Jumping
        if keys[pygame.K_SPACE] and not self.jumping:
            self.vel_y = -15
            self.jumping = True

        # Collision with ground
        if self.rect.bottom >= HEIGHT:        
            self.rect.bottom = HEIGHT
            self.jumping = False

class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, w, h):
        super().__init__()
        self.image = pygame.Surface((w, h))
        self.image.fill(GREEN)
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

class Goal(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

# Levels
levels = [
    {"platforms": [(0, 550, 800, 50), (300, 400, 200, 20), (600, 300, 150, 20)], "goal": (750, 250)},
    {"platforms": [(0, 550, 800, 50), (200, 450, 150, 20), (400, 350, 150, 20), (650, 250, 100, 20)], "goal": (750, 200)},
    {"platforms": [(0, 550, 800, 50), (250, 500, 100, 20), (500, 400, 150, 20), (700, 300, 80, 20)], "goal": (750, 250)}
]

# Initialize groups
all_sprites = pygame.sprite.Group()
platforms = pygame.sprite.Group()
goals = pygame.sprite.Group()

# Load first level
def load_level(level_index):
    all_sprites.empty()
    platforms.empty()
    goals.empty()

    player = Player()
    all_sprites.add(player)

    for platform_data in levels[level_index]["platforms"]:
        platform = Platform(*platform_data)
        platforms.add(platform)
        all_sprites.add(platform)

    goal = Goal(*levels[level_index]["goal"])
    goals.add(goal)
    all_sprites.add(goal)

    return player

level_index = 0
player = load_level(level_index)

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Update
    all_sprites.update()

    # Collision with platforms
    for platform in platforms:
        if player.rect.colliderect(platform.rect) and player.vel_y > 0:
            player.rect.bottom = platform.rect.top
            player.vel_y = 0
            player.jumping = False

    # Collision with goal
    if pygame.sprite.spritecollideany(player, goals):
        level_index += 1
        if level_index >= len(levels):
            print("You won the game!")
            running = False
        else:
            player = load_level(level_index)

    # Draw
    screen.fill(WHITE)
    all_sprites.draw(screen)

    # Refresh display
    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()
