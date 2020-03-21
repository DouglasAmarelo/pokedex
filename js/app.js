(function() {
  'use strict';

  const $pokedex = document.querySelector('.pokedex');
  const ORIGINAL_POKEMONS = 30;

  const generatePokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

  const generatePokemonPromisses = () =>
    Array(ORIGINAL_POKEMONS)
      .fill()
      .map(async (_, idx) => {
        const response = await fetch(generatePokemonURL(idx + 1));
        return await response.json();
      });

  const generateTemplate = ({ id, name, types }) => {
    const pokemonTypes = types.map(({ type }) => type.name);

    return `
      <li class="card ${pokemonTypes[0]}">
        <img
          class="card-image"
          src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"
          alt="${name}"
        />
        <h2 class="card-title">
          ${id}. ${name}
        </h2>
        <p class="card-subtitle">
          ${pokemonTypes.join(' | ')}
        </p>
      </li>
    `;
  };

  const getTemplate = pokemons => {
    return pokemons.reduce(
      (accumulator, currentPokemon) =>
        (accumulator += generateTemplate(currentPokemon)),
      ''
    );
  };

  const insertPomemonstIntopage = pokemons => ($pokedex.innerHTML = pokemons);

  const pokemonPromisses = generatePokemonPromisses();

  Promise.all(pokemonPromisses)
    .then(getTemplate)
    .then(insertPomemonstIntopage);
})();
