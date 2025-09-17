import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# 1: sin(x)/x          2: x^2       3: x^3
# 4: exp(-x)-1         5: tan(x)    6: 1-cos(x)
# 7: log(x+1)          8: abs(x)    9: x/abs(x)
# 10: sin(5x)/x
escolha_funcao = 3  # So mudar

def minha_funcao(val):
    if escolha_funcao == 1:
        return np.where(val==0, 1, np.sin(val)/val)
    elif escolha_funcao == 2:
        return val**2
    elif escolha_funcao == 3:
        return val**3
    elif escolha_funcao == 4:
        return np.exp(-val) - 1
    elif escolha_funcao == 5:
        return np.tan(val)
    elif escolha_funcao == 6:
        return 1 - np.cos(val)
    elif escolha_funcao == 7:
        return np.log(val + 1)
    elif escolha_funcao == 8:
        return np.abs(val)
    elif escolha_funcao == 9:
        return np.where(val==0, 0, val/np.abs(val)) #EVITAR 0/0
    elif escolha_funcao == 10:
        return np.where(val==0, 5, np.sin(5*val)/val)
    else:
        return val

xv = np.linspace(-2, 2, 400)
yv = minha_funcao(xv)

fig, ax = plt.subplots(figsize=(8,5))
ax.plot(xv, yv, color='blue', label="f(x)")
ax.axhline(1, color='red', linestyle='--', label="Limite x → 0")
ponto, = ax.plot([], [], 'ro', markersize=8)
texto = ax.text(0.05, 0.9, '', transform=ax.transAxes)
ax.set_xlim(-2, 2)
ax.set_ylim(-0.5, 1.5)
ax.set_title("Visualização de Limite")
ax.set_xlabel("x")
ax.set_ylabel("f(x)")
ax.legend()
ax.grid(True)

def animar(i):
    x = np.linspace(-2, 2, 400)[i]
    y = minha_funcao(x)
    ponto.set_data([x], [y])
    texto.set_text(f"x = {x:.3f}, f(x) = {y:.3f}")
    return ponto, texto

anim = FuncAnimation(fig, animar, frames=400, interval=50, blit=True)
plt.show()
