import Image from "../components/image";
import { state } from "./imageGenerator";

export const getPokemonNumber = (score, min, max) => {
	let newMons = 0;

	if (state.pokeNumbers.length === 0) {
		generateNewImages(min, max, score);
	}

	if (score > 0 && (score + 1) % state.reloadNumber === 0) {
		state.pokeNumbers = [];
		generateNewImages(min, max);
	}

	for (let k = 0; k < 10; k++) {
		if (!state.selectedNumbers.includes(state.pokeNumbers[k])) {
			newMons++;
		}
	}

	//make sure all mons havent already been selected
	if (newMons < 2) {
		state.pokeNumbers = [];
		generateNewImages(min, max);
	}

	return state.pokeNumbers;
};

function generateNewImages(min, max) {
	let pokemonNum;

	for (let i = 0; i < 10; i++) {
		do {
			pokemonNum = min + Math.floor(Math.random() * (max - min + 1));
		} while (state.pokeNumbers.includes(pokemonNum));
		state.pokeNumbers.push(pokemonNum);
	}
}

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

async function fetchPokemonData(pokemonNumber, handleImageClick) {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch Pokemon data");
		}
		const pokemonData = await response.json();
		const namesData = pokemonData.names;
		const nameData = namesData.find((name) => name.language.name === "en");
		const pokemonName = nameData ? nameData.name : null;
		return (
			<Image
				key={pokemonNumber}
				onImageClick={() => handleImageClick(pokemonNumber)}
				pokemonNumber={pokemonNumber}
				pokemonName={pokemonName}
			/>
		);
	} catch (error) {
		console.error("Error fetching Pokemon data:", error);
	}
}

export default fetchPokemonData;
