import random
import json

def luo_satelliittidata(kierrokset, tallenna=False, tiedostonimi="satelliitti_data.json"):
    data = []

    for _ in range(kierrokset):
        # Luodaan satunnaisluku, joka antaa 1-3 luvun todennäköisemmin.
        numero = random.choices([1, 2, 3, 4, 5, 6, 7, 8, 9], weights=[40, 30, 20, 5, 5, 5, 5, 5, 5])[0]
        data.append(numero)
        print(numero)

    # Tallennetaan data JSON-tiedostoon, jos tallenna=True
    if tallenna:
        with open(tiedostonimi, "w") as tiedosto:
            json.dump(data, tiedosto)
        print(f"Data tallennettu tiedostoon {tiedostonimi}")

# Käyttö: 
# luo_satelliittidata(kierrokset=100, tallenna=True) # Luo 100 numeroa ja tallentaa tiedostoon
