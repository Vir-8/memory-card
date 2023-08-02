import { useEffect, useRef, useState } from "react";

let usedNumbers = [];
let selectedNumbers = [];

const Image = ({ onImageClick, onImageLoad, pokemonNumber }) => {
	console.log("creating " + pokemonNumber);

	return (
		<img
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
			className="logo"
			onClick={onImageClick}
			onLoad={onImageLoad}
		/>
	);
};

function ImageGenerator({ getScore }) {
	const [images, setImages] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const containerRef = useRef(null);
	let newImages = [];

	useEffect(() => {
		const GenerateImages = async () => {
			let promises = [];
			for (let i = 0; i < 10; i++) {
				let pokemonNumber;

				do {
					pokemonNumber = Math.floor(Math.random() * 151) + 1;
				} while (usedNumbers.includes(pokemonNumber));
				usedNumbers.push(pokemonNumber);

				promises.push(
					Promise.resolve(
						<Image
							key={i}
							onImageClick={() => handleImageClick(pokemonNumber)}
							pokemonNumber={pokemonNumber}
						/>
					)
				);
			}
			newImages = await Promise.all(promises);

			const divElement = (
				<div
					ref={containerRef}
					style={{
						display: "none",
					}}>
					{newImages}
				</div>
			);

			setImages(divElement);
			setTimeout(() => {
				setLoading(false);
				containerRef.current.style.display = "block";
			}, 800);
		};

		const handleImageClick = (pokemonNumber) => {
			if (selectedNumbers.includes(pokemonNumber)) {
				alert("already selected, you lose");
			} else {
				selectedNumbers.push(pokemonNumber);
				getScore();
			}
			regenerateImages();
		};

		const regenerateImages = async () => {
			usedNumbers = [];
			setImages([]);
			setLoading(true);
			containerRef.current.style.display = "none";
			await GenerateImages();
		};

		GenerateImages();
	}, []);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{images}
		</>
	);
}

export default ImageGenerator;
