import pygame
import sys
import json
import time

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 1500, 1000
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
        self.rect.topleft = (50, HEIGHT - 100)
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
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (400, 800, 300, 20), (800, 600, 200, 20)], "goal": (1450, 550)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (300, 900, 200, 20), (700, 700, 150, 20), (1100, 500, 150, 20)], "goal": (1400, 450)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (200, 850, 150, 20), (600, 750, 100, 20), (900, 600, 200, 20), (1300, 400, 150, 20)], "goal": (1450, 350)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (150, 900, 150, 20), (500, 800, 200, 20), (800, 650, 100, 20), (1150, 500, 150, 20), (1400, 350, 100, 20)], "goal": (1450, 300)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (100, 950, 100, 20), (400, 850, 150, 20), (700, 750, 150, 20), (1000, 600, 100, 20), (1300, 450, 150, 20)], "goal": (1450, 400)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (300, 950, 200, 20), (600, 850, 150, 20), (900, 750, 150, 20), (1200, 650, 100, 20), (1400, 550, 100, 20)], "goal": (1450, 500)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (250, 900, 150, 20), (500, 800, 150, 20), (800, 700, 100, 20), (1100, 600, 150, 20), (1350, 500, 150, 20)], "goal": (1450, 450)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (150, 950, 150, 20), (450, 850, 150, 20), (750, 750, 150, 20), (1050, 650, 150, 20), (1350, 550, 150, 20)], "goal": (1450, 500)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (100, 900, 150, 20), (300, 850, 150, 20), (600, 800, 150, 20), (900, 700, 150, 20), (1200, 600, 150, 20)], "goal": (1450, 550)},
    {"platforms": [(0, HEIGHT - 50, WIDTH, 50), (200, 950, 150, 20), (500, 850, 150, 20), (800, 750, 150, 20), (1100, 650, 150, 20), (1400, 550, 150, 20)], "goal": (1450, 500)}
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
    try:
        with open("times.json", "r") as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    existing_data.append({"game": len(existing_data) + 1, "times": times})

    with open("times.json", "w") as f:
        json.dump(existing_data, f, indent=4)

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

        level_index += 1
        if level_index >= len(levels):
            save_times(times)
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
