import pygame
import sys
import json
import time

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
BACKGROUND_COLOR = (135, 206, 235)  # Light blue sky color

# Initialize screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tasohyppelypeli")
clock = pygame.time.Clock()

# Classes
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill((255, 215, 0))  # Yellow for a unique appearance
        pygame.draw.circle(self.image, (0, 0, 0), (25, 25), 25, 2)  # Black border
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
    {"platforms": [(0, 550, 800, 50), (250, 500, 100, 20), (500, 400, 150, 20), (700, 300, 80, 20)], "goal": (750, 250)},
    {"platforms": [(0, 550, 800, 50), (150, 450, 100, 20), (350, 400, 100, 20), (550, 350, 100, 20), (700, 300, 50, 20)], "goal": (750, 250)},
    {"platforms": [(0, 550, 800, 50), (100, 500, 80, 20), (300, 450, 80, 20), (500, 400, 80, 20), (700, 350, 50, 20)], "goal": (750, 300)}
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

# Save times to JSON file
def save_times(times):
    with open("times.json", "w") as f:
        json.dump(times, f)

level_index = 0
player = load_level(level_index)
times = []
start_time = time.time()

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
        end_time = time.time()
        level_time = round(end_time - start_time, 2)
        times.append({"level": level_index + 1, "time": level_time})
        save_times(times)

        level_index += 1
        if level_index >= len(levels):
            print("You won the game!")
            running = False
        else:
            player = load_level(level_index)
            start_time = time.time()

    # Draw
    screen.fill(BACKGROUND_COLOR)
    all_sprites.draw(screen)

    # Refresh display
    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()
