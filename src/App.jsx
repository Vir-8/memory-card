import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageGenerator from "./assets/components/imageGeneration";

function App() {
	return (
		<>
			<div>{<ImageGenerator />}</div>
		</>
	);
}

export default App;
