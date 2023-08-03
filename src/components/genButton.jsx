const GenButton = ({ gen, loadGen }) => {
	const genRanges = {
		1: { min: 1, max: 151 },
		2: { min: 152, max: 251 },
		3: { min: 252, max: 386 },
		4: { min: 387, max: 493 },
		5: { min: 494, max: 649 },
		6: { min: 650, max: 721 },
		7: { min: 722, max: 809 },
		8: { min: 810, max: 905 },
	};

	const { min, max } = genRanges[gen] || { min: 0, max: 0 };

	return (
		<button
			onClick={() => {
				loadGen(min, max);
			}}>
			Gen {gen}
		</button>
	);
};

export default GenButton;
