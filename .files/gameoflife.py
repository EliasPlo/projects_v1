import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Alustetaan ruudukko
def initialize_grid(size, fill_probability=0.5):
    """Alustaa satunnaisen soluruudukon"""
    return np.random.choice([0, 1], size=size, p=[1-fill_probability, fill_probability])

# Päivittää solujen tilan seuraavaan askeleeseen
def update_grid(grid):
    """Päivittää ruudukon solujen tilat yhdellä askeleella"""
    new_grid = np.zeros_like(grid)
    for i in range(grid.shape[0]):
        for j in range(grid.shape[1]):
            # Lasketaan naapurien määrä
            total = np.sum(grid[i-1:i+2, j-1:j+2]) - grid[i, j]  # Ei lasketa itse solua
            if grid[i, j] == 1:
                # Solu pysyy hengissä, jos sillä on 2 tai 3 naapuria
                if total == 2 or total == 3:
                    new_grid[i, j] = 1
            else:
                # Kuollut solu herää eloon, jos sillä on tarkalleen 3 naapuria
                if total == 3:
                    new_grid[i, j] = 1
    return new_grid

# Visualisointi ja animaatio
def animate_game_of_life(size=(50, 50), frames=100, interval=100):
    grid = initialize_grid(size)

    fig, ax = plt.subplots()
    im = ax.imshow(grid, cmap='binary')

    def update(frame):
        nonlocal grid
        grid = update_grid(grid)
        im.set_array(grid)
        return [im]

    ani = animation.FuncAnimation(fig, update, frames=frames, interval=interval, blit=True)
    plt.show()

# Käynnistä simulaatio
animate_game_of_life()
