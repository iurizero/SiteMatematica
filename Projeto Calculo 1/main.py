import numpy as np
import matplotlib.pyplot as plt

# Função: (x^2 - 1) / (x - 1), que tem limite 2 quando x -> 1
def f(x):
    return (x**2 - 1) / (x - 1)

# Valores de x (evitando x=1 para não dar divisão por zero)
x = np.linspace(0, 2, 400)
x = x[x != 1]

y = f(x)

# Gráfico
plt.figure(figsize=(8, 5))
plt.plot(x, y, label="f(x) = (x² - 1)/(x - 1)", color="blue")
plt.axhline(y=2, color="red", linestyle="--", label="Limite y = 2")
plt.axvline(x=1, color="gray", linestyle=":")

# Destacar aproximações numéricas
for dx in [0.5, 0.1, 0.05, 0.01]:
    plt.scatter(1+dx, f(1+dx), color="green")
    plt.scatter(1-dx, f(1-dx), color="orange")

plt.title("Visualização de Limite")
plt.xlabel("x")
plt.ylabel("f(x)")
plt.legend()
plt.grid(True)
plt.show()