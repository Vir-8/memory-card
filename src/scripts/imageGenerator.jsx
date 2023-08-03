import { useEffect, useRef, useState } from "react";
import Image from "../components/image";

let usedNumbers = [];
let selectedNumbers = [];

const getPokemonNumber = (min, max) => {
	let i;
	do {
		i = min + Math.floor(Math.random() * (max - min + 1));
	} while (usedNumbers.includes(i));
	return i;
};

function ImageGenerator({ getScore, min, max }) {
	const [images, setImages] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const containerRef = useRef(null);
	let newImages = [];

	useEffect(() => {
		const GenerateImages = async () => {
			let promises = [];

			for (let i = 0; i < 10; i++) {
				let pokemonNumber = getPokemonNumber(min, max);
				usedNumbers.push(pokemonNumber);

				promises.push(
					// Using fetch to get the Pokemon name from PokeAPI
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`)
						.then((response) => {
							if (!response.ok) {
								throw new Error("Failed to fetch Pokemon data");
							}
							let pokemonData = response.json();
							return pokemonData;
						})
						.then((pokemonData) => {
							const namesData = pokemonData.names;
							const nameData = namesData.find(
								(name) => name.language.name === "en"
							);
							const pokemonName = nameData ? nameData.name : null;
							return (
								<Image
									key={i}
									onImageClick={() => handleImageClick(pokemonNumber)}
									pokemonNumber={pokemonNumber}
									pokemonName={pokemonName}
								/>
							);
						})
						.catch((error) => {
							console.error("Error fetching Pokemon data:", error);
						})
				);
			}
			newImages = await Promise.all(promises);

			const divElement = (
				<div
					className="imageContainer"
					ref={containerRef}
					style={{
						display: "none",
					}}>
					{newImages}
				</div>
			);

			setImages(divElement);
			setTimeout(() => {
				setLoading(false);
				containerRef.current.style.display = "flex";
			}, 800);
		};

		const handleImageClick = (pokemonNumber) => {
			if (selectedNumbers.includes(pokemonNumber)) {
				alert("already selected, you lose");
				selectedNumbers = [];
				getScore("lose");
			} else {
				selectedNumbers.push(pokemonNumber);
				getScore("win");
			}
			regenerateImages();
		};

		const regenerateImages = async () => {
			usedNumbers = [];
			setImages([]);
			setLoading(true);
			containerRef.current.style.display = "none";
			await GenerateImages();
		};

		GenerateImages();
	}, []);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{images}
		</>
	);
}

export default ImageGenerator;