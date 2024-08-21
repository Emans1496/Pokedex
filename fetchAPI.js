document.addEventListener("DOMContentLoaded", () => {
  let nameEl = document.getElementById("name");
  let imgEl = document.getElementById("image");
  let typeEl = document.getElementById("type");
  let abilitiesEl = document.getElementById("abilities");
  let currentPokemon = null;
  const heightEl = document.getElementById("height");
  const weightEl = document.getElementById("weight");
  const baseEl = document.getElementById("base");
  const idEl = document.getElementById("idPokemon");
  const renderDisplayEl = document.querySelector("#render-display");
  const btnEl = document.getElementById("search");
  const nameInputEl = document.getElementById("pokemon-name");
  const nextPokemonBtn = document.getElementById("next-pokemon");
  const previousPokemonBtn = document.getElementById("previous-pokemon");
  const spriteOneEl = document.getElementById("spriteOne");
  const spriteTwoEl = document.getElementById("spriteTwo");
  const spriteThreeEl = document.getElementById("spriteThree");
  const spriteFourEl = document.getElementById("spriteFour");
  const spriteFiveEl = document.getElementById("spriteFive");
  const spriteSixEl = document.getElementById("spriteSix");
  const spriteSevenEl = document.getElementById("spriteSeven");
  const spriteEightEl = document.getElementById("spriteEight");
  const spriteNineEl = document.getElementById("spriteNine");
  const spriteTenEl = document.getElementById("spriteTen");
  const spriteElevenEl = document.getElementById("spriteEleven");
  const spriteTwelveEl = document.getElementById("spriteTwelve");
  const playCriesLatestEl = document.getElementById("play-cries-latest");
  const playCriesLegacyEl = document.getElementById("play-cries-legacy");
  const audioPlayer = document.createElement("audio");
  const audioSource = document.createElement("source");
  const evolutionEl = document.getElementById("evolution");
  const genderEl = document.getElementById("gender");
  const habitatEl = document.getElementById("habitat");
  const regionEl = document.getElementById("region");
  const informationsTitleEl = document.getElementById("informationsTitle");
  const spritesTitleEl = document.getElementById("spritesTitle");
  const alertWrite = document.getElementById("alert-write");
  audioSource.type = "audio/ogg";
  audioPlayer.appendChild(audioSource);

  nextPokemonBtn.addEventListener("click", nextPokemon);
  previousPokemonBtn.addEventListener("click", previousPokemon);
  btnEl.addEventListener("click", getPokemon);
  playCriesLatestEl.addEventListener("click", playCriesLatestFunction);
  playCriesLegacyEl.addEventListener("click", playCriesLegacyFunction);

  function playCriesLatestFunction() {
    if (currentPokemon && currentPokemon.cries && currentPokemon.cries.latest) {
      const cryUrl = currentPokemon.cries.latest;
      audioSource.src = cryUrl;
      audioPlayer.load();
      audioPlayer.play();
      alertWrite.textContent = "Playing latest cry...";
    } else {
      alertWrite.textContent = "Latest cry is not available";
    }
  }

  function playCriesLegacyFunction() {
    if (currentPokemon && currentPokemon.cries && currentPokemon.cries.legacy) {
      const cryUrl = currentPokemon.cries.legacy;
      audioSource.src = cryUrl;
      audioPlayer.load();
      audioPlayer.play();
      alertWrite.textContent = "Playing legacy cry...";
    } else {
      alertWrite.textContent = "Legacy cry is not available";
    }
  }

  nameInputEl.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getPokemon();
      nameInputEl.value = "";
    }
  });

  nameInputEl.addEventListener("focusin", () => {
    nameInputEl.placeholder = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      previousPokemon();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextPokemon();
    }
  });

  document.getElementById('start').addEventListener('click', function () {
    const slider = document.querySelector('.slider');
    slider.classList.add('slide-out');
    slider.addEventListener('animationend', function () {
      document.getElementById('image-animation').style.display = 'none';
    });
  });

  async function getLastPokemonId() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=10000";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch the last Pokémon ID");
      }
      const data = await response.json();
      const lastPokemonUrl = data.results[0].url;
      const lastPokemonId = parseInt(
        lastPokemonUrl.split("/").slice(-2, -1)[0]
      );
      return lastPokemonId;
    } catch (error) {
      console.log(error);
      return 1025;
    }
  }

  async function getPokemon() {
    let pokemonName = document
      .getElementById("pokemon-name")
      .value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pokemon not found: ${pokemonName}`);
      }
      const pokemon = await response.json();
      console.log(pokemon);
      renderPokemon(pokemon);
    } catch (error) {
      console.log(error);
      renderError(error.message);
    }
  }

  async function getPokemonSpecies(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch Pokémon species data");
      }
      const speciesData = await response.json();
      return speciesData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getPokemonEvolutionChain(pokemon) {
    try {
      const speciesResponse = await fetch(pokemon.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      return evolutionData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function renderEvolutionChain(evolutionChain) {
    if (!evolutionChain) {
      evolutionEl.innerHTML = "No evolution data available";
      return;
    }

    const chain = [];
    let currentStage = evolutionChain.chain;

    do {
      chain.push(currentStage.species.name);
      currentStage = currentStage.evolves_to[0];
    } while (currentStage);

    evolutionEl.innerHTML = `Evolution Chain: ${chain.join(" -> ")}`;
  }

  async function renderPokemon(pokemon) {
    currentPokemon = pokemon;
    renderDisplayEl.classList.add("render-displayFired");
    nameEl.innerHTML = pokemon.name.toUpperCase();
    if (
      pokemon.sprites.other &&
      pokemon.sprites.other["official-artwork"] &&
      pokemon.sprites.other["official-artwork"].front_default
    ) {
      imgEl.src = pokemon.sprites.other["official-artwork"].front_default;
    } else {
      imgEl.src = pokemon.sprites.front_default || "";
    }
    informationsTitleEl.innerText = "INFORMATIONS";
    spritesTitleEl.innerText = "SPRITES";
    spriteOneEl.src = pokemon.sprites.front_default || "";
    spriteTwoEl.src = pokemon.sprites.back_default || "";
    spriteThreeEl.src = pokemon.sprites.front_shiny || "";
    spriteFourEl.src = pokemon.sprites.back_shiny || "";
    spriteFiveEl.src = pokemon.sprites.front_shiny_female || "";
    spriteSixEl.src = pokemon.sprites.back_female || "";
    spriteSevenEl.src = pokemon.sprites.front_female_shiny || "";
    spriteEightEl.src = pokemon.sprites.back_female_shiny || "";
    spriteNineEl.src = pokemon.sprites.front_female_shiny_hoenn || "";
    spriteTenEl.src = pokemon.sprites.back_female_shiny_hoenn || "";
    spriteElevenEl.src = pokemon.sprites.front_female_shiny_sinnoh || "";
    spriteTwelveEl.src = pokemon.sprites.back_female_shiny_sinnoh || "";
    idEl.innerHTML = `ID ${pokemon.id}`;
    heightEl.innerHTML = `${pokemon.height} dm`;
    weightEl.innerHTML = `${pokemon.weight} hg`;
    baseEl.innerHTML = `Base experience ${pokemon.base_experience}`;
    abilitiesEl.innerHTML = pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(", ");
    typeEl.innerHTML = pokemon.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ");
    nameInputEl.value = "";
    playCriesLatestFunction();

    const evolutionChain = await getPokemonEvolutionChain(pokemon);
    renderEvolutionChain(evolutionChain);

    const speciesData = await getPokemonSpecies(pokemon.species.url);
    if (speciesData) {
      genderEl.innerHTML = `Gender Rate: ${speciesData.gender_rate}`;
      habitatEl.innerHTML = `Habitat: ${speciesData.habitat ? speciesData.habitat.name : "Unknown"}`;
      regionEl.innerHTML = `Generation: ${speciesData.generation.name}`;
    }
  }

  function renderError(errorMessage) {
    nameEl.innerHTML = "Error";
    imgEl.src = "";
    typeEl.innerHTML = errorMessage;
    currentPokemon = null;
  }

  async function nextPokemon() {
    let nextId;
    if (currentPokemon == null) {
      console.log("No current Pokémon to find the next one for.");
      nextId = 1;
    } else {
      nextId = currentPokemon.id + 1;
    }
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${nextId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pokemon not found with ID: ${nextId}`);
      }
      const nextPokemon = await response.json();
      console.log(nextPokemon);
      renderPokemon(nextPokemon);
      nameInputEl.value = "";
    } catch (error) {
      console.log(error);
      if (nextId > 1010) {
        nextId = 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${nextId}`;
        const response = await fetch(url);
        const nextPokemon = await response.json();
        renderPokemon(nextPokemon);
      } else {
        renderError(error.message);
      }
    }
  }

  async function previousPokemon() {
    let previousId;
    if (currentPokemon == null || currentPokemon.id === 1) {
      console.log("No current Pokémon or first Pokémon, finding the last one.");
      previousId = await getLastPokemonId();
    } else {
      previousId = currentPokemon.id - 1;
    }
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${previousId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Pokemon not found with ID: ${previousId}`);
      }
      const previousPokemon = await response.json();
      console.log(previousPokemon);
      renderPokemon(previousPokemon);
      nameInputEl.value = "";
    } catch (error) {
      console.log(error);
      if (previousId < 1) {
        previousId = await getLastPokemonId();
        const url = `https://pokeapi.co/api/v2/pokemon/${previousId}`;
        const response = await fetch(url);
        const previousPokemon = await response.json();
        renderPokemon(previousPokemon);
      } else {
        renderError(error.message);
      }
    }
  }
});
