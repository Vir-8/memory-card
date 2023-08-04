import { useEffect, useRef, useState } from "react";
import Image from "../components/image";
import fetchPokemonData from "./pokemonData";
import { getPokemonNumber, shuffleArray } from "./pokemonData";

let pokeNumbers = [];
let selectedNumbers = [];

function ImageGenerator({ score, getScore, min, max }) {
	const [images, setImages] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const containerRef = useRef(null);
	const timeoutRef = useRef(1000);
	let newImages = [];

	pokeNumbers = getPokemonNumber(score, min, max, pokeNumbers);

	const GenerateImages = async () => {
		shuffleArray(pokeNumbers);
		let promises = pokeNumbers.map((pokemonNumber) =>
			fetchPokemonData(pokemonNumber, handleImageClick)
		);

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
		}, timeoutRef.current);
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
		setImages([]);
		setLoading(true);
		containerRef.current.style.display = "none";
		await GenerateImages();
	};

	useEffect(() => {
		GenerateImages();
	}, []);

	useEffect(() => {
		timeoutRef.current = score === 0 || score % 7 === 0 ? 5000 : 100;
	}, [score]);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{images}
		</>
	);
}

export default ImageGenerator;
