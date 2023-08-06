import { useState } from "react";
import "./App.css";
import ImageGenerator from "./scripts/imageGenerator";
import Score from "./components/score";
import GenButton from "./components/genButton";
import StartMenu from "./components/startMenu";
import { state } from "./scripts/imageGenerator";
import BackButton from "./components/backButton";

function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [genLoaded, setGenLoaded] = useState(false);
	const [menuLoaded, setMenuLoaded] = useState(false);
	const [genImagesLoaded, setGenImagesLoaded] = useState(false);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);
	const genValues = ["1", "2", "3", "4", "5", "6", "7", "8"];

	const updateImageStatus = (newValue) => {
		setGenImagesLoaded(newValue);
	};

	const updateScore = (status) => {
		if (status == "win") {
			setScore((prevScore) => prevScore + 1);
		} else if (status == "lose") {
			setScore(0);
		}
	};

	const updateBestScore = (newBestScore) => {
		setBestScore(newBestScore);
	};

	const showMenu = () => {
		state.pokeNumbers = [];
		console.log(state.pokeNumbers);
		setGenLoaded(false);
		setGenImagesLoaded(false);
		setScore(0);
		setMenuLoaded(true);
	};

	const loadGen = (min, max) => {
		setMin(min);
		setMax(max);
		setMenuLoaded(false);
		setGenLoaded(true);
	};

	return (
		<>
			{genLoaded && (
				<>
					<div className="gameHeader">
						<div className="backButtonContainer">
							<BackButton
								showMenu={showMenu}
								status={genImagesLoaded}></BackButton>
						</div>
						<Score
							score={score}
							bestScore={bestScore}
							updateBestScore={updateBestScore}
						/>
					</div>

					<ImageGenerator
						score={score}
						getScore={updateScore}
						status={genImagesLoaded}
						updateStatus={updateImageStatus}
						min={min}
						max={max}
					/>
				</>
			)}

			{menuLoaded && (
				<div className="menu">
					<h1 className="menuHeader">Select generation!</h1>
					<div className="menuButtonContainer">
						{genValues.map((gen) => (
							<GenButton key={gen} gen={gen} loadGen={loadGen}></GenButton>
						))}
					</div>
				</div>
			)}

			{!menuLoaded && !genLoaded && (
				<StartMenu onButtonClick={showMenu}></StartMenu>
			)}
		</>
	);
}

export default App;
