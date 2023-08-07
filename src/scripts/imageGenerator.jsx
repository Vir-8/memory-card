import { useEffect, useRef, useState } from "react";
import fetchPokemonData from "./pokemonData";
import { getPokemonNumber, shuffleArray } from "./pokemonData";

const state = {
	pokeNumbers: [],
	selectedNumbers: [],
	reloadNumber: 0,
};

const newReloadNumber = {
	Easy: 4,
	Medium: 6,
	Hard: 8,
};

function ImageGenerator(props) {
	const { score, getScore, status, updateStatus, min, max, difficulty } = props;
	const [images, setImages] = useState([]);
	const [reloadNumber, setReloadNumber] = useState(0);

	const containerRef = useRef(null);
	const timeoutRef = useRef(1000);

	let newImages = [];
	state.reloadNumber = newReloadNumber[difficulty];

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
		timeoutRef.current = score === 0 || score % reloadNumber === 0 ? 1000 : 100;
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
