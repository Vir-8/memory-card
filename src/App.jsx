import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageGenerator from "./components/imageGeneration";
import Score from "./components/score";

function App() {
	const [score, setScore] = useState(0);

	const updateScore = () => {
		setScore((prevScore) => prevScore + 1);
	};

	useEffect(() => {
		console.log("Score updated:", score);
	}, [score]);

	return (
		<>
			<Score score={score} />
			<ImageGenerator getScore={updateScore} />
		</>
	);
}

export default App;
