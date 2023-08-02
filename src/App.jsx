import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageGenerator from "./components/imageGeneration";
import Score from "./components/score";

function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	const updateScore = () => {
		setScore((prevScore) => prevScore + 1);
	};

	const updateBestScore = (newBestScore) => {
		setBestScore(newBestScore);
	};

	return (
		<>
			<Score
				score={score}
				bestScore={bestScore}
				updateBestScore={updateBestScore}
			/>
			<ImageGenerator score={score} getScore={updateScore} />
		</>
	);
}

export default App;
