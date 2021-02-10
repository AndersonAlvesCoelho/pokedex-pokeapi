
export function getDetailsPokemon(pokemon) {
    return  fetch(pokemon)
        .then(data => data.json())
}