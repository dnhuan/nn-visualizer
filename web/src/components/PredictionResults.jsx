import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { boardStateAtom } from "../states/Board";

export default function PredictionResults() {
	const [debounceTimeout, setDebounceTimeout] = useState(null);
	const [boardState] = useAtom(boardStateAtom);
	const [result, setResult] = useState({
		prediction: Array.from({ length: 10 }, () => 0.0),
	});

	useEffect(() => {
		async function fetchPrediction() {
			try {
				if (
					boardState.length === 0 ||
					boardState.flat().reduce((a, b) => a + b, 0) === 0
				) {
					throw new Error("No pixels drawn");
				}

				const result = await getPrediction(boardState);
				setResult(result);
			} catch (error) {
				setResult({
					prediction: Array.from({ length: 10 }, () => 0.0),
				});
			}
		}

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		// 0.5 second delay
		setDebounceTimeout(setTimeout(fetchPrediction, 500));
	}, [boardState]);

	return <div>{displayPrediction(result)}</div>;
}

function displayPrediction(result) {
	const bestPrediction = result.prediction.indexOf(
		Math.max(...result.prediction)
	);
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

async function getPrediction(boardState) {
	// map from true/false to 0/1
	const mappedBoardState = boardState.map((row) =>
		row.map((cell) => (cell ? 1.0 : 0.0))
	);

	// transpose
	const transposedBoardState = mappedBoardState[0].map((_, colIndex) =>
		mappedBoardState.map((row) => row[colIndex])
	);

	const raw = JSON.stringify(transposedBoardState);

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: raw,
	};

	const response = await fetch("/api/predict", requestOptions);
	const data = await response.json();
	return data;
	// return {
	// 	prediction: Array.from({ length: 10 }, () => Math.random()),
	// };
}
