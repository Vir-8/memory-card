import { useEffect, useState } from "react";
import { state } from "../scripts/imageGenerator";

const BackButton = ({ showMenu, status }) => {
	return (
		<>
			{status && (
				<button
					className="backButton"
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
