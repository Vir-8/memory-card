const Image = ({ onImageClick, onImageLoad, pokemonNumber, pokemonName }) => {
	return (
		<div>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
				className="logo"
				onClick={onImageClick}
				onLoad={onImageLoad}
			/>
			<p>{pokemonName}</p>
		</div>
	);
};

export default Image;
