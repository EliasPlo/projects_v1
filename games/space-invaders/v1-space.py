import pygame
import random

# Alustetaan Pygame
pygame.init()

# Määritellään pelin ikkunan koko
SCREEN_WIDTH = 1000
SCREEN_HEIGHT = 800
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption('Space Invaders 0.1 alpha')

# Värit
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)

# Pelaajan aluksen asetukset
player_width = 50
player_height = 30
player_x = SCREEN_WIDTH // 2 - player_width // 2
player_y = SCREEN_HEIGHT - player_height - 10
player_speed = 5

# Vihollisten asetukset
enemy_width = 50
enemy_height = 30
enemy_speed = 1  # Normaalin vaikeustason vihollisten nopeus
enemy_list = []

# Ammusten asetukset
bullet_width = 5
bullet_height = 10
bullet_speed = 7
bullets = []

# Peliin liittyvät tilat
lives = 10  # Pelaajalla on aluksi 10 elämää
score = 0  # Aluksi pisteet ovat nolla
game_over = False  # Peli ei ole aluksi ohi
distance_travelled = 0  # Matka, jonka pelaaja on kulkenut ylös

# Fontti pistelaskuriin ja elämien näyttämiseen
font = pygame.font.SysFont("Arial", 20)
large_font = pygame.font.SysFont("Arial", 40)

# Vaikeustaso valikkoon liittyvät muuttujat
difficulty = 'Normal'  # Oletusvaikeustaso
difficulty_list = ['Easy', 'Normal', 'Hard']
enemy_frequency = 1  # Vihollisten määrä vaikeustasosta riippuen

# Määritellään pelin kellotus
clock = pygame.time.Clock()

# Funktio pelaajan aluksen piirtämiseen
def draw_player(x, y):
    pygame.draw.rect(screen, GREEN, (x, y, player_width, player_height))

# Funktio vihollisten piirtämiseen
def draw_enemies():
    for enemy in enemy_list:
        pygame.draw.rect(screen, RED, enemy)

# Funktio ammusten piirtämiseen
def draw_bullets():
    for bullet in bullets:
        pygame.draw.rect(screen, WHITE, bullet)

# Funktio elämien ja pisteiden näyttämiseen
def draw_stats():
    lives_text = font.render(f"Lives: {lives}", True, BLUE)
    score_text = font.render(f"Score: {score}", True, BLUE)
    screen.blit(lives_text, (10, 10))
    screen.blit(score_text, (SCREEN_WIDTH - score_text.get_width() - 10, 10))

# Funktio vaikeustason valikolle
def draw_difficulty_menu():
    screen.fill(BLACK)
    title_text = large_font.render("Valitse Vaikeustaso", True, WHITE)
    screen.blit(title_text, (SCREEN_WIDTH // 2 - title_text.get_width() // 2, SCREEN_HEIGHT // 4))

    # Näytetään valikon vaihtoehdot
    for idx, level in enumerate(difficulty_list):
        level_text = font.render(level, True, WHITE)
        screen.blit(level_text, (SCREEN_WIDTH // 2 - level_text.get_width() // 2, SCREEN_HEIGHT // 2 + idx * 30))

    # Sammuta peli -nappi
    quit_text = font.render("Sammuta Peli", True, WHITE)
    screen.blit(quit_text, (SCREEN_WIDTH // 2 - quit_text.get_width() // 2, SCREEN_HEIGHT // 2 + len(difficulty_list) * 30))

    pygame.display.update()

# Funktio vihollisten liikkumiseen
def move_enemies():
    global enemy_speed
    for enemy in enemy_list:
        enemy.y += enemy_speed

# Funktio ammusten liikkumiseen
def move_bullets():
    global bullets
    for bullet in bullets[:]:
        bullet.y -= bullet_speed
        if bullet.y < 0:
            bullets.remove(bullet)

# Funktio tarkistamaan törmäykset
def check_collisions():
    global enemy_list, bullets, score, lives
    for bullet in bullets[:]:
        for enemy in enemy_list[:]:
            if bullet.colliderect(enemy):
                bullets.remove(bullet)
                enemy_list.remove(enemy)
                score += 10  # Pisteet kasvavat vihollisen tuhoamisesta

    # Tarkistetaan pelaajan ja vihollisten törmäykset
    for enemy in enemy_list[:]:
        if pygame.Rect(player_x, player_y, player_width, player_height).colliderect(enemy):
            lives -= 1  # Pelaaja menettää elämän törmätessään viholliseen
            enemy_list.remove(enemy)  # Poistetaan törmännyt vihollinen

# Funktio uuden vihollisen luomiseen
def create_enemy():
    enemy_x = random.randint(0, SCREEN_WIDTH - enemy_width)
    enemy_y = random.randint(-150, -50)
    enemy = pygame.Rect(enemy_x, enemy_y, enemy_width, enemy_height)
    enemy_list.append(enemy)

# Peli looppi
def game_loop():
    global player_x, bullets, enemy_list, lives, score, game_over, distance_travelled, enemy_speed, difficulty, enemy_frequency
    running = True
    while running:
        screen.fill(BLACK)  # Taustan väri

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:  # Paikalla on ESC-painallus
                    draw_difficulty_menu()  # Näytetään vaikeustason valikko
                    selecting_difficulty = True
                    while selecting_difficulty:
                        for e in pygame.event.get():
                            if e.type == pygame.QUIT:
                                selecting_difficulty = False
                                running = False
                            if e.type == pygame.KEYDOWN:
                                if e.key == pygame.K_UP:  # Valitse Normaali
                                    difficulty = 'Normal'
                                    selecting_difficulty = False
                                elif e.key == pygame.K_DOWN:  # Valitse Helppo
                                    difficulty = 'Easy'
                                    selecting_difficulty = False
                                elif e.key == pygame.K_RETURN:  # Valitse Vaikea
                                    difficulty = 'Hard'
                                    selecting_difficulty = False
                                elif e.key == pygame.K_q:  # Sammuta peli
                                    running = False
                                    selecting_difficulty = False
                    # Muutetaan vihollisten nopeus ja määrä vaikeustason mukaan
                    if difficulty == 'Easy':
                        enemy_speed = 0.5
                        enemy_frequency = 1
                    elif difficulty == 'Hard':
                        enemy_speed = 2
                        enemy_frequency = 2
                    else:
                        enemy_speed = 1
                        enemy_frequency = 1

        # Saadaan näppäinkomennot
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and player_x > 0:
            player_x -= player_speed
        if keys[pygame.K_RIGHT] and player_x < SCREEN_WIDTH - player_width:
            player_x += player_speed
        if keys[pygame.K_SPACE]:
            bullet = pygame.Rect(player_x + player_width // 2 - bullet_width // 2, player_y, bullet_width, bullet_height)
            bullets.append(bullet)

        # Liikuta ammuksia ja vihollisia
        move_bullets()
        move_enemies()

        # Tarkista törmäykset
        check_collisions()

        # Luo uusia vihollisia ajoittain
        if random.randint(1, enemy_frequency * 10) == 1:
            create_enemy()

        # Piirrä pelaaja, viholliset ja ammukset
        draw_player(player_x, player_y)
        draw_enemies()
        draw_bullets()

        # Piirrä pistetiedot ja elämät
        draw_stats()

        # Kasvata pisteitä matkan mukaan
        distance_travelled += 1
        score += distance_travelled // 100  # Pisteet kasvavat matkanteon mukaan

        # Piirrä pisteet ja elämät
        draw_stats()

        # Tarkista, jos peli on päättynyt
        if lives <= 0:
            game_over_text = large_font.render("GAME OVER", True, RED)
            screen.blit(game_over_text, (SCREEN_WIDTH // 2 - game_over_text.get_width() // 2, SCREEN_HEIGHT // 3))
            
            # Uusinta-nappi
            retry_text = font.render("Paina R aloittaaksesi alusta", True, WHITE)
            screen.blit(retry_text, (SCREEN_WIDTH // 2 - retry_text.get_width() // 2, SCREEN_HEIGHT // 2))
            
            pygame.display.update()

            # Odotetaan uusinta-napilla
            waiting_for_retry = True
            while waiting_for_retry:
                for e in pygame.event.get():
                    if e.type == pygame.QUIT:
                        waiting_for_retry = False
                        running = False
                    elif e.type == pygame.KEYDOWN:
                        if e.key == pygame.K_r:  # Paina R aloittaaksesi pelin uudestaan
                            game_loop()
                            waiting_for_retry = False

        # Päivitä peli
        pygame.display.update()

        # Asetetaan pelin FPS (frames per second)
        clock.tick(60)

# Aloitetaan peli
game_loop()

# Suljetaan Pygame
pygame.quit()
