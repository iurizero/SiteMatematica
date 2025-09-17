import os

temperatura = 0.0
celsius =  ["c", "C", "celsius", "Celsius"]
farehrenheit = ["f", "F", "fahrenheit", "Fahrenheit"]
opcao = input("Digite a unidade de temperatura que deseja converter (Celsius = C ou Fahrenheit = F): ")
while opcao not in celsius and opcao not in farehrenheit:
    print("Opção inválida! Tente novamente.")
    opcao = input("Digite a unidade de temperatura que deseja converter (Celsius = C ou Fahrenheit = F): ")
while True:
    try:
        temperatura = float(input("Digite a temperatura que deseja converter: "))
        break
    except ValueError:
        print("Valor inválido! Digite um número.")
if opcao in celsius:
    temperatura_convertida = (temperatura * 9/5) + 32
    print(f"A temperatura de {temperatura}°C corresponde a {temperatura_convertida}°F")
else:
    temperatura_convertida = (temperatura - 32) * 5/9
    print(f"A temperatura de {temperatura}°F corresponde a {temperatura_convertida}°C")

print("\n")
input(print("Pressione ENTER para sair..."))
os.system("reset")
