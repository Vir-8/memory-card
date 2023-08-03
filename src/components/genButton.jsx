const GenButton = ({ gen, loadGen }) => {
	return (
		<button
			onClick={() => {
				loadGen(gen);
			}}>
			Gen {gen}
		</button>
	);
};

export default GenButton;
