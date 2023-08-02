import { useEffect } from "react";

const Score = ({ score, bestScore, updateBestScore }) => {
	useEffect(() => {
		const storedBestScore = localStorage.getItem("bestScore");
		if (storedBestScore) {
			updateBestScore(storedBestScore);
		}
	}, []);

	useEffect(() => {
		// Update bestScore if the current score is greater
		if (score > bestScore) {
			updateBestScore(score);
			localStorage.setItem("bestScore", score);
		}
	}, [score, bestScore]);

	return (
		<>
			<h1>Score: {score}</h1>
			<p>Best Score: {bestScore}</p>
		</>
	);
};

export default Score;
