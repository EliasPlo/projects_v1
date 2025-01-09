import random
import string
import time

# Funktio, joka luo satunnaisen merkkijonon 0-99999, jossa sekoitetaan kirjaimia ja numeroita
def generate_random():
    length = random.randint(2, 10)  # Pituus 4-8 merkkiä
    result = []
    
    for _ in range(length):
        # Sekoitetaan satunnaisesti kirjaimia ja numeroita
        if random.random() < 0.5:  # 50% todennäköisyys numerolle tai kirjaimelle
            result.append(random.choice(string.digits))  # Satunnainen numero
        else:
            result.append(random.choice(string.ascii_lowercase))  # Satunnainen kirjain
    
    # Yhdistetään lista merkkijonoksi
    return ''.join(result)

def main():
    while True:
        num_or_str = generate_random()
        print(num_or_str)
        time.sleep(0.3)  # Tauko ennen seuraavaa lukua (tätä voi muuttaa tarpeen mukaan)

if __name__ == "__main__":
    main()
