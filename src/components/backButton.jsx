const BackButton = ({ showMenu, status, newClass }) => {
	return (
		<>
			{status && (
				<button
					className={`backButton ${newClass}`}
					onClick={() => {
						showMenu();
					}}>
					Back
				</button>
			)}
		</>
	);
};

export default BackButton;
