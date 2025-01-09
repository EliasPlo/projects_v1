import random
import string
import time

# Funktio, joka luo satunnaisen merkkijonon, jossa on numeroita, kirjaimia ja erikoismerkkejä
def generate_random():
    # Määritellään satunnainen pituus 3-10 merkkiä
    length = random.randint(3, 10)
    
    result = []
    
    prev_char_type = None  # Pitää kirjaa edellisestä merkkityypistä (numero, kirjain, erikoismerkki)
    
    for _ in range(length):
        # Voimme valita kirjaimen, numeron tai erikoismerkin
        char_type = random.choices(["digit", "letter", "special"], weights=[0.4, 0.5, 0.1], k=1)[0]
        
        # Vältetään liian monta peräkkäistä numeroa tai kirjainta
        if prev_char_type == char_type:
            # Jos edellinen merkki oli sama tyyppi, vaihdetaan se
            if char_type == "digit":
                char_type = "letter"
            elif char_type == "letter":
                char_type = "digit"
            else:
                char_type = random.choice(["digit", "letter"])
        
        # Lisää satunnainen merkki riippuen tyypistä
        if char_type == "digit":
            result.append(random.choice(string.digits))  # Satunnainen numero
        elif char_type == "letter":
            result.append(random.choice(string.ascii_lowercase))  # Satunnainen kirjain
        else:
            result.append(random.choice(string.punctuation))  # Satunnainen erikoismerkki
        
        # Tallenna nykyinen merkkityyppi
        prev_char_type = char_type
    
    # Yhdistetään lista merkkijonoksi
    return ''.join(result)

def main():
    while True:
        num_or_str = generate_random()
        print(num_or_str)
        time.sleep(0.1)  # Tauko ennen seuraavaa merkkijonoa (säädettävissä)

if __name__ == "__main__":
    main()
