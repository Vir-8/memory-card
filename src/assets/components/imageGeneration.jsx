import { useEffect, useRef, useState } from "react";

let usedNumbers = [];

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

function ImageGenerator() {
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
							onImageClick={regenerateImages}
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
						visibility: "hidden",
					}}>
					{newImages}
				</div>
			);

			setImages(divElement);
			setTimeout(() => {
				setLoading(false);
				containerRef.current.style.visibility = "visible";
			}, 300);
		};

		GenerateImages();

		async function regenerateImages() {
			usedNumbers = [];
			console.log(usedNumbers);
			setImages([]);
			setLoading(true);
			containerRef.current.style.visibility = "hidden";
			await GenerateImages();
		}
	}, []);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{images}
		</>
	);
}

export default ImageGenerator;
