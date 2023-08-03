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
		if (gen === "1") {
			setMin(1);
			setMax(151);
		} else if (gen === "2") {
			setMin(152);
			setMax(251);
		} else if (gen === "3") {
			setMin(252);
			setMax(386);
		} else if (gen === "4") {
			setMin(387);
			setMax(493);
		} else if (gen === "5") {
			setMin(494);
			setMax(649);
		} else if (gen === "6") {
			setMin(650);
			setMax(721);
		} else if (gen === "7") {
			setMin(722);
			setMax(809);
		} else if (gen === "8") {
			setMin(810);
			setMax(905);
		}

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
