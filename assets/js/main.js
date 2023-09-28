const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const profileContent = document.getElementById("profileContent");

const maxRecords = 151;
const limit = 10;
let offset = 0;

// Função redireciona para página de detalhes ao ser clicada
function redirectToDetails(pokemonNumber) {
  // Cria variável com URL de detalhes + pokemon id
  const detailsUrl = `pokemon_profile.html`;
  // Redireciona o usuário para a página details.html
  window.location.href = detailsUrl;
  // Chama função para mostrar perfil do pokemon
  pokeApi.getPokemonDetailsToProfile(pokemonNumber);
}

// Função mostra detalhes de acordo com clique no menu
function showItems(category) {
  // Cria variável para cada item do menu e remove a ativação
  let menuItems = document.querySelectorAll(".menu_items");
  menuItems.forEach((item) => {
    // Remove a ativação do item
    item.classList.remove("active");
  });

  // Adiciona ativação à categoria clicada
  document.getElementById(category).classList.add("active");
}

// Função carrega mais pokemons na pokedex
function loadMoreItems(offset, limit) {
  // Chamando requisição de API e listando pokemon no browse
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      // Primeiro mapeia todos os pokemons e os converte em li de HTML via MAP e convertPokemonToLi
      // Depois unifica tudo em uma string sem separador via JOIN
      // Depois incrementa lista convertida em string no html via innerHTML
      const newHtml = pokemons
        .map((pokemon) => {
          return `<li class="pokemon ${
            pokemon.type
          }" onclick="redirectToDetails(${pokemon.number})">
                  <span class="number">#${pokemon.number}</span>
                  <span class="name">${pokemon.name}</span>
  
                  <div class="detail">
                      <ol class="types">
                          ${pokemon.types
                            .map(
                              (type) => `<li class="type ${type}"> ${type}</li>`
                            )
                            .join("")}
                      </ol>
  
                      <img src="${pokemon.photo}"
                          alt="${pokemon.name}">
                  </div>
  
              </li>`;
        })
        .join("");
      if (pokemonList) {
        pokemonList.innerHTML += newHtml;
      }
    })
    // Retorna erro caso promise dê errado
    .catch((erro) => console.log(erro));
}

// Carrega primeiros pokemons na tela
loadMoreItems(offset, limit);

// Ao clicar carrega mais pokemons de acordo com o limite estabelecido
if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    // Atribui ao numero de novos elementos o valor somado ao limite atual
    offset += limit;

    // Armazena o número de itens da próxima página
    const qtdRecordsWithNextPage = offset + limit;

    // Verifica se a próxima página passa do limite estabelecido
    if (qtdRecordsWithNextPage >= maxRecords) {
      // Se passar, cria novo limite com a diferença do limite estabelecido e
      // o número de elementos atual
      const newLimit = maxRecords - offset;

      // Carrega mais itens de acordo com o novo limite
      loadMoreItems(offset, newLimit);

      // Remove botão da tela
      loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
      // Se não passar, carrega mais itens de acordo com os valores calculados
      loadMoreItems(offset, limit);
    }
  });
}
