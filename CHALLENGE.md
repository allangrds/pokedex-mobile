# Z1 Mobile Test

## Objetivo

Vamos nos atentar prioritariamente aos seguintes pontos:

- **JavaScript**: aproveite seus conhecimentos das funcionalidades mais atuais da linguagem que otimizem seu desenvolvimento;

- **React Native**: queremos entender como você estrutura suas aplicações usando o framework junto à biblioteca base (React);

- **TypeScript**: nós usamos por aqui, mas o uso é opcional. Caso use nos mostre ao máximo seu conhecimento;

- **Testes unitários**

- **Estilização**: use a forma que você tem mais costume e experiência para que vejamos como é seu fluxo de trabalho com estilos.

## Avaliação

Já o resultado será avaliado com base em:

- Qualidade do código
- Funcionamento da aplicação
- Documentação e instruções para execução
- Documentação das decisões durante o processo desenvolvimento
- Como você tratou casos de carregamento e erros

## Desafio Pokédex

O desafio consiste em a partir da PokéAPI realizar uma lista de pokémons paginada, onde ao selecionar determinado pokémon você consegue acessar uma página com um resumo de informações (status básicos como abilities, species e types) do mesmo, junto a um botão de captura que irá guardar este Pokémon a uma lista de pokémons capturados. A página com a lista inicial deve conter uma barra de pesquisa que quando usada terá seus resultados no lugar da lista original. Essa lista deve ser persistente no aplicativo.

**Obs.**: No campo species, você deve trazer o valor de egg_groups a partir da url consumida.

**Exemplo**
Dado uma requisição inicial em https://pokeapi.co/api/v2/pokemon, você teria o seguinte retorno com uma lista de pokémons, onde cada pokémon teria uma url que ao consultá-la, trará todas as informações do mesmo:
