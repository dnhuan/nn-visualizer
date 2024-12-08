import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { boardStateAtom } from "../states/Board";
import {
	isDrawn,
	findIndexOfMax,
	getPredictionClientSide,
} from "../inference/InferenceUtils";

export default function PredictionResults() {
	const [debounceTimeout, setDebounceTimeout] = useState(null);
	const [boardState] = useAtom(boardStateAtom);
	const [result, setResult] = useState({
		prediction: Array.from({ length: 10 }, () => 0.0),
	});

	useEffect(() => {
		async function fetchPrediction() {
			try {
				if (!isDrawn(boardState)) {
					return;
				}

				const result = getPredictionClientSide(boardState);
				setResult(result);
			} catch (error) {
				console.error(error);
				setResult({
					prediction: Array.from({ length: 10 }, () => 0.0),
				});
			}
		}

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		// 0.5 second delay
		setDebounceTimeout(setTimeout(fetchPrediction, 1));
	}, [boardState]);

	return <div>{displayPrediction(result)}</div>;
}

function displayPrediction(result) {
	const bestPrediction = findIndexOfMax(result);

	return (
		<div>
			{result.prediction.map((p, i) => (
				<div
					key={i}
					className={i === bestPrediction ? "text-green-500" : ""}
				>
					{i}: {p.toFixed(2)}
				</div>
			))}
		</div>
	);
}
