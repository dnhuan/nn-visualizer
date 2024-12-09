import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { boardStateAtom } from "../states/Board";
import { DisplayGraph } from "./FcnnGraph";
import { isDrawn, getPredictionClientSide } from "../inference/InferenceUtils";

const defaultResult = {
	input: Array.from({ length: 28 * 28 }, () => 0.0),
	A1: Array.from({ length: 28 }, () => 0.0),
	A2: Array.from({ length: 14 }, () => 0.0),
	prediction: Array.from({ length: 10 }, () => 0.0),
};

export default function PredictionResults() {
	const [boardState] = useAtom(boardStateAtom);
	const [result, setResult] = useState(defaultResult);

	useEffect(() => {
		async function fetchPrediction() {
			try {
				if (!isDrawn(boardState)) {
					setResult(defaultResult);
					return;
				}

				const result = getPredictionClientSide(boardState);
				setResult(result);
			} catch (error) {
				console.error(error);
				setResult(defaultResult);
			}
		}
		fetchPrediction();
	}, [boardState]);

	return <DisplayGraph net={result} />;
}
