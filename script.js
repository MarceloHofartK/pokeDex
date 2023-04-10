const apiPokemons = `https://pokeapi.co/api/v2/pokemon?limit=200`
const pokedex = document.querySelector('#pokedex')
let pokemons = []
let strPesquisa = document.getElementById('inputPokemon')
let letrasDigitadas = ''

fetch(apiPokemons)
  .then(Response => Response.json())
  .then(pokemon =>{
    for(let p = 1; p <= 200; p++){
      pokedex.innerHTML += `
      <li class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p}.png" alt="PokePhoto">
        <h4>${pokemon.results[p-1].name}</h4>
        <h6>#${p}<h6>
      </li>
      `
      pokemons.push({name: pokemon.results[p-1].name, id: p-1}) 
    }
  })

strPesquisa.addEventListener('keydown', (ev)=> {
  const codigoTecla = ev.keyCode;
  
  if (codigoTecla >= 65 && codigoTecla <= 90) {
    const letraDigitada = ev.key.toLowerCase();
    letrasDigitadas += letraDigitada;
  } else if (codigoTecla === 8) {
    letrasDigitadas = letrasDigitadas.slice(0, -1);
  }
  
  pokedex.innerHTML = ''

  const pokemonsEncontrados = pokemons.filter(function(poke){
    return poke.name.toLowerCase().startsWith(letrasDigitadas)
  })  

  if (pokemonsEncontrados.length > 0){
    pokemonsEncontrados.forEach((poke)=>{
      pokedex.innerHTML +=` 
      <li class="pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id+1}.png" alt="PokePhoto">
        <h4>${poke.name}</h4>
        <h6>#${poke.id+1}<h6>
      </li>
      `
    })
  }
})
