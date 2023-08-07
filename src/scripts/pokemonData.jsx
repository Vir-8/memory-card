import Image from "../components/image";
import { state } from "./imageGenerator";

export const getPokemonNumber = (score, min, max) => {
	let pokemonNum;
	if (state.pokeNumbers.length === 0) {
		for (let i = 0; i < 10; i++) {
			do {
				pokemonNum = min + Math.floor(Math.random() * (max - min + 1));
			} while (state.pokeNumbers.includes(pokemonNum));
			state.pokeNumbers.push(pokemonNum);
		}
	}

	if (score > 0 && (score + 1) % 7 === 0) {
		state.pokeNumbers = [];
		for (let j = 0; j < 10; j++) {
			do {
				pokemonNum = min + Math.floor(Math.random() * (max - min + 1));
			} while (state.pokeNumbers.includes(pokemonNum));
			state.pokeNumbers.push(pokemonNum);
		}
	}

	return state.pokeNumbers;
};

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
