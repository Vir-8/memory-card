const DiffcultyButton = ({ difficulty, loadGen }) => {
	return (
		<button
			className="menuButton"
			onClick={() => {
				loadGen(difficulty);
			}}>
			{difficulty}
		</button>
	);
};

export default DiffcultyButton;
