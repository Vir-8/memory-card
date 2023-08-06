function StartMenu({ onButtonClick }) {
	return (
		<div className="startMenu">
			<img
				className="startMenuHeader"
				src="../src/assets/title.png"
				alt="title"
			/>
			<button className="startButton" onClick={onButtonClick}>
				Start Game
			</button>
		</div>
	);
}

export default StartMenu;
