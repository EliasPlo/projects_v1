import pygame
import random
import math

# Pygame initialization
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Random Numbers")

# Set up fonts
font = pygame.font.Font(None, 74)

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Function to generate a random number with weighted probability
def weighted_random():
    while True:
        number = random.randint(0, 10000)
        probability = 1 / (1 + math.sqrt(number))  # Larger numbers have lower probability
        if random.random() < probability:
            return number

# Main loop
running = True
clock = pygame.time.Clock()

# Store the last random number
last_number = None

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Generate a random number
    last_number = weighted_random()

    # Clear the screen
    screen.fill(BLACK)

    # Render the random number
    if last_number is not None:
        text = font.render(str(last_number), True, WHITE)
        text_rect = text.get_rect(center=(WIDTH // 2, HEIGHT // 2))
        screen.blit(text, text_rect)

    # Update the display
    pygame.display.flip()

    # Wait a moment before showing the next number
    clock.tick(1)  # Limit to 1 number per second

# Quit pygame
pygame.quit()
