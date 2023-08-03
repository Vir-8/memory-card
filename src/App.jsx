import { useState } from "react";
import "./App.css";
import ImageGenerator from "./components/imageGeneration";
import Score from "./components/score";
import GenButton from "./components/genButton";

function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [genLoaded, setGenLoaded] = useState(false);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);

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

	const loadGen = (gen) => {
		const genRanges = {
			1: { min: 1, max: 151 },
			2: { min: 152, max: 251 },
			3: { min: 252, max: 386 },
			4: { min: 387, max: 493 },
			5: { min: 494, max: 649 },
			6: { min: 650, max: 721 },
			7: { min: 722, max: 809 },
			8: { min: 810, max: 905 },
		};

		const { min, max } = genRanges[gen] || { min: 0, max: 0 };
		setMin(min);
		setMax(max);

		setGenLoaded(true);
	};

	return (
		<>
			{genLoaded ? (
				<>
					<Score
						score={score}
						bestScore={bestScore}
						updateBestScore={updateBestScore}
					/>
					<ImageGenerator
						score={score}
						getScore={updateScore}
						min={min}
						max={max}
					/>
				</>
			) : (
				<>
					<GenButton gen="1" loadGen={loadGen}></GenButton>
					<GenButton gen="2" loadGen={loadGen}></GenButton>
					<GenButton gen="3" loadGen={loadGen}></GenButton>
					<GenButton gen="4" loadGen={loadGen}></GenButton>
					<GenButton gen="5" loadGen={loadGen}></GenButton>
					<GenButton gen="6" loadGen={loadGen}></GenButton>
					<GenButton gen="7" loadGen={loadGen}></GenButton>
					<GenButton gen="8" loadGen={loadGen}></GenButton>
				</>
			)}
		</>
	);
}

export default App;
