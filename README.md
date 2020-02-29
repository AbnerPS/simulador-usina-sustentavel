# Simulador de Usina Sustentável

![Versão do software](https://img.shields.io/badge/Version-1.0-orange.svg) 

Este projeto tem como objetivo **simular** de forma simples a operação de uma usina de geração de energia sustentável.

# Como funciona
A aplicação é dividida em app mobile que é responsável pelo autentificação e liberação de acesso e a pagina web onde a aplicação principal roda.

## No aplicativo mobile
Nele você faz seu login e se autentifica via impressão digital. Após isso o app solicitará que você escaneie seu QRCode que aparecera na pagina web após realizar o login nela.

## Na pagina web
Na pagina index você faz seu login com e-mail e senha e escaneara o QRCode com o app mobile para ser redirecionado para a dashboard.
Na dashboard você poderá executar as funcionalidades da aplicação dependendo do nível de acesso do seu usuário que são:
- **Operador**: permissão apenas para executar a simulação
- **Coordenador**: permissão para executar a simulação e gerar um relatório
- **Gerente**: permissão para executar a simulação, gerar relatório e cadastrar novos usuários

No painel lateral esquerdo você pode inserir um valor de tempo (em segundos) para a simulação. Como modo de simplificar o projeto, os segundos de operação são considerados como horas.
No termino de cada simulação você pode gerar um relatório em pdf com os dados de produção.

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
