import React from "react";
import titleImage from "../assets/title.png";

function StartMenu({ onButtonClick }) {
	return (
		<div className="startMenu">
			<img
				className={`startMenuHeader animateHeader`}
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
