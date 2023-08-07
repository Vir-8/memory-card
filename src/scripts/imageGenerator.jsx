import { useEffect, useRef, useState } from "react";
import Image from "../components/image";
import fetchPokemonData from "./pokemonData";
import { getPokemonNumber, shuffleArray } from "./pokemonData";

const state = {
	pokeNumbers: [],
	selectedNumbers: [],
	reloadNumber: 0,
};

function ImageGenerator(props) {
	const { score, getScore, status, updateStatus, min, max, difficulty } = props;

	const [images, setImages] = useState([]);
	const containerRef = useRef(null);
	const timeoutRef = useRef(1000);
	const [reloadNumber, setReloadNumber] = useState(0);
	let newImages = [];

	if (difficulty === "Easy") {
		state.reloadNumber = 4;
	} else if (difficulty === "Medium") {
		state.reloadNumber = 6;
	} else if (difficulty === "Hard") {
		state.reloadNumber = 8;
	}

	const GenerateImages = async () => {
		getPokemonNumber(score, min, max);

		shuffleArray(state.pokeNumbers);
		let promises = state.pokeNumbers.map((pokemonNumber) =>
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
			updateStatus(true);
			containerRef.current.style.display = "grid";
		}, timeoutRef.current);
	};

	const handleImageClick = (pokemonNumber) => {
		if (state.selectedNumbers.includes(pokemonNumber)) {
			alert("already selected, you lose");
			state.selectedNumbers = [];
			getScore("lose");
		} else {
			state.selectedNumbers.push(pokemonNumber);
			getScore("win");
		}
		regenerateImages();
	};

	const regenerateImages = async () => {
		setImages([]);
		updateStatus(false);
		containerRef.current.style.display = "none";
		await GenerateImages();
	};

	useEffect(() => {
		GenerateImages();
	}, []);

	useEffect(() => {
		setReloadNumber(state.reloadNumber);
		timeoutRef.current = score === 0 || score % reloadNumber === 0 ? 2000 : 100;
		getPokemonNumber(score, min, max);
	}, [score]);

	return (
		<>
			{!status && <h1>Loading...</h1>}
			{images}
		</>
	);
}

export default ImageGenerator;
export { state };
