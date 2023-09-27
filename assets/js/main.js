const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

// Função redireciona para página de detalhes ao ser clicada
function redirectToDetails(pokemonNumber){
    // Cria variável com URL de detalhes + pokemon id
    const detailsUrl = `pokemon_profile.html?id=${pokemonNumber}`

    // Redireciona o usuário para a página details.html
    window.location.href = detailsUrl;
}

// Função mostra detalhes de acordo com clique no menu
function showItems(category){
    // Cria variável para cada item do menu e remove a ativação
    let menuItems = document.querySelectorAll(".menu_items");
    menuItems.forEach((item)=>{
        // Remove a ativação do item
        item.classList.remove("active");
    });

    // Adiciona ativação à categoria clicada
    document.getElementById(category).classList.add("active");
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="redirectToDetails('${pokemon.number}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})