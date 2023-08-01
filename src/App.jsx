import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [usedNumbers, setUsedNumbers] = useState([]);
	let images = [];

	const Image = () => {
		let pokemonNumber;

		do {
			pokemonNumber = Math.floor(Math.random() * 151) + 1;
		} while (usedNumbers.includes(pokemonNumber));
		setUsedNumbers[{ pokemonNumber }];

		return (
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
				className="logo"
				alt="Vite logo"
				onClick={regenerateImages}
			/>
		);
	};

	const GenerateImages = () => {
		images = [];
		for (let i = 0; i < 10; i++) {
			images.push(<Image />);
		}
		return images;
	};

	function regenerateImages() {
		images = [];
		setUsedNumbers([]);
	}

	return (
		<>
			<div>{<GenerateImages />}</div>
		</>
	);
}

export default App;
