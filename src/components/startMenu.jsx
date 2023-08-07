import React from "react";
import { useState } from "react";
import titleImage from "../assets/title.png";

function StartMenu({ onButtonClick }) {
	const [animationPlayed, setAnimationPlayed] = useState(true);

	const handleMouseEnter = () => {
		if (!animationPlayed) {
			setAnimationPlayed(true);
		}
	};

	const handleAnimationEnd = () => {
		setTimeout(() => {
			setAnimationPlayed(false);
		}, 400);
	};

	return (
		<div className="startMenu">
			<img
				className={`startMenuHeader ${animationPlayed ? "animateHeader" : ""}`}
				onMouseEnter={handleMouseEnter}
				onAnimationEnd={handleAnimationEnd}
				src={titleImage}
				alt="title"
			/>
			<button className="startButton" onClick={onButtonClick}>
				Start Game
			</button>
		</div>
	);
}

export default StartMenu;
