import numpy as np
import matplotlib.pyplot as plt

# --- Preparação dos dados ---
x = np.linspace(-3, 3, 1000)

# 1) Função contínua: f(x) = x^2
f_cont = x**2

# 2) Descontinuidade removível: (x^2 - 1)/(x - 1), com "buraco" em x=1
f_rem = (x**2 - 1) / (x - 1)
# colocar NaN exatamente em x=1 para mostrar o buraco
eps = 1e-8
f_rem[np.abs(x - 1) < eps] = np.nan
# também calcular valor limite em x=1
lim_rem = 2  # limite quando x->1

# 3) Descontinuidade de salto: função definida por partes
#    g(x) = x+1 para x<0 ; g(x) = x+2 para x>=0  (salto de 1 em x=0)
g = np.where(x < 0, x + 1, x + 2)
# valores laterais no ponto x=0
left_at_0 = 0 + 1
right_at_0 = 0 + 2

# 4) Descontinuidade infinita: h(x) = 1/x (mostrando assíntota em 0)
# evitar plotar exatamente em 0
x_h_left = np.linspace(-3, -0.05, 400)
x_h_right = np.linspace(0.05, 3, 400)
h_left = 1 / x_h_left
h_right = 1 / x_h_right

# --- Plotagem ---
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes = axes.flatten()

# Plot 1: contínua
ax = axes[0]
ax.plot(x, f_cont, linewidth=2)
ax.set_title("Função contínua: $f(x)=x^2$")
ax.axvline(0, linestyle="--", linewidth=0.7)
ax.grid(True)

# Plot 2: removível (buraco)
ax = axes[1]
ax.plot(x, f_rem, linewidth=2)
# marcar o buraco em x=1
ax.scatter([1], [lim_rem], s=80, facecolors='none', edgecolors='black', linewidths=1.5, label='limite (buraco)')
ax.set_title("Descontinuidade removível: $\\frac{x^2-1}{x-1}$ (buraco em x=1)")
ax.axvline(1, linestyle=":", linewidth=0.7)
ax.grid(True)
ax.legend()

# Plot 3: salto
ax = axes[2]
ax.plot(x, g, linewidth=2)
# destacar limites laterais em x = 0
ax.scatter([0], [left_at_0], s=50)   # limite pela esquerda (preenchido)
ax.scatter([0], [right_at_0], s=50)  # limite pela direita (preenchido)
ax.set_title("Descontinuidade de salto: função por partes (salto em x=0)")
ax.axvline(0, linestyle=":", linewidth=0.7)
ax.grid(True)

# Plot 4: infinita
ax = axes[3]
ax.plot(x_h_left, h_left, linewidth=2)
ax.plot(x_h_right, h_right, linewidth=2)
ax.set_ylim(-10, 10)
ax.set_title("Descontinuidade infinita: $h(x)=1/x$ (assíntota em x=0)")
ax.axvline(0, linestyle="--", color="gray", linewidth=0.8)
ax.grid(True)

plt.tight_layout()
plt.show()