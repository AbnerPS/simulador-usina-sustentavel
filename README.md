# Simulador de Usina Sustent�vel

![Vers�o do software](https://img.shields.io/badge/Version-1.0-orange.svg) 

Este projeto tem como objetivo **simular** de forma simples a opera��o de uma usina de gera��o de energia sustent�vel.

# Como funciona
A aplica��o � dividida em app mobile que � respons�vel pelo autentifica��o e libera��o de acesso e a pagina web onde a aplica��o principal roda.

## No aplicativo mobile
Nele voc� faz seu login e se autentifica via impress�o digital. Ap�s isso o app solicitar� que voc� escaneie seu QRCode que aparecera na pagina web ap�s realizar o login nela.

## Na pagina web
Na pagina index voc� faz seu login com e-mail e senha e escaneara o QRCode com o app mobile para ser redirecionado para a dashboard.
Na dashboard voc� poder� executar as funcionalidades da aplica��o dependendo do n�vel de acesso do seu usu�rio que s�o:
- **Operador**: permiss�o apenas para executar a simula��o
- **Coordenador**: permiss�o para executar a simula��o e gerar um relat�rio
- **Gerente**: permiss�o para executar a simula��o, gerar relat�rio e cadastrar novos usu�rios

No painel lateral esquerdo voc� pode inserir um valor de tempo (em segundos) para a simula��o. Como modo de simplificar o projeto, os segundos de opera��o s�o considerados como horas.
No termino de cada simula��o voc� pode gerar um relat�rio em pdf com os dados de produ��o.

![print da dashboard](./imagens/printdashboard.png)

# Tecnologias usados

- HTML
- CSS
- Javascript
- Bootstrap
- Jquery
- Firebase
- JsPDF
- QRCodeJs
