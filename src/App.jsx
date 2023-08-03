import { useState } from "react";
import "./App.css";
import ImageGenerator from "./components/imageGeneration";
import Score from "./components/score";

function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

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
