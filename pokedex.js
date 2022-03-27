const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const fetchPokemon = () => {
	const pokeName = document.getElementById("pokeName");
	let pokeInput = pokeName.value.toLowerCase();
	
	const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
	fetch(url).then((res) => {
		//console.log(res);
		if(res.status != "200"){
			pokeImagen("pokeball.png");
			errorMessage();
		}else{
			noErrorMessage();
			return res.json();
		}
	}).then((data)=>{
		console.log(data);
		let pokeImg = data.sprites.front_default;
		let pokeID = data.id;
		let pokeNombre = data.name;
		
		const { stats, types } = data;
		
		console.log(pokeNombre);
		
		pokeImagen(pokeImg);
		pokeIdentificador(pokeID);
		nombrePokemon(pokeNombre);
		
		setCardColor(types);
		renderPokemonTypes(types);
		renderPokemonStats(stats);
		
	}).catch(err => errorMessage())
	;
}

//fetchPokemon();

const imprimirPokemon = () => {
	const pokeName = document.getElementById("pokeName");
	let pokeInput = pokeName.value;
	//console.log("Hello Again :P "+pokeInput);
}

const pokeImagen = (url) => {
	const pokeImag = document.getElementById("pokeImagen");
	pokeImag.src = url;
}

function pokeIdentificador(ID) {
	var pokeID = document.getElementById("pokeID");
	pokeID.textContent = "N° "+ID;
}

function nombrePokemon(Nombre) {
	var nombrePokemon = document.getElementById("nombrePokemon");
	nombrePokemon.textContent = Nombre;
}

//pokeImagen("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");


function errorMessage() {
	var error = document.getElementById("error");
	var pokeID = document.getElementById("pokeID");
	var nombrePokemon = document.getElementById("nombrePokemon");
	
	const pokeImag = document.getElementById("pokeImagen");
	const pokeTypes = document.querySelector('[data-poke-types]');
	const pokeStats = document.querySelector('[data-poke-stats]');
	
	pokeID.textContent = "";
	error.textContent = "Pokémon no encontrado";
	error.style.color = "red";
	nombrePokemon.textContent = "";
	pokeTypes.innerHTML = "";
    pokeStats.innerHTML = "";
	pokeImag.style.background =  '#fff';
}

function noErrorMessage() {
	var error = document.getElementById("error");
	error.textContent = "";
}


const setCardColor = types => {
	const pokeImag = document.getElementById("pokeImagen");
	
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImag.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImag.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
	const pokeTypes = document.querySelector('[data-poke-types]');
	
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
	const pokeStats = document.querySelector('[data-poke-stats]');
	
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}