export function getListPokemon(api) {
    return fetch(api)
      .then(data => data.json())
  }