import weightsAndBiases from "../../data/weights.json";
import { FCNN } from "./FCNN";

export function isDrawn(boardState) {
	return (
		boardState.length > 0 &&
		boardState.flat().reduce((a, b) => a + b, 0) > 0
	);
}

export function findIndexOfMax(result) {
	let bestPrediction;
	if (Math.max(...result.prediction) == 0.0) {
		bestPrediction = -1;
	} else {
		bestPrediction = result.prediction.indexOf(
			Math.max(...result.prediction)
		);
	}

	return bestPrediction;
}

function preProcessForInference(boardState) {
	// map from true/false to 0/1
	const mappedBoardState = boardState.map((row) =>
		row.map((cell) => (cell ? 1.0 : 0.0))
	);

	// transpose
	const transposedBoardState = mappedBoardState[0].map((_, colIndex) =>
		mappedBoardState.map((row) => row[colIndex])
	);

	// shift image to center

	return transposedBoardState;
}

export function getPredictionClientSide(boardState) {
	const transposedBoardState = preProcessForInference(boardState);

	const model = new FCNN(weightsAndBiases);
	const result = model.forward(transposedBoardState);

	return result;
}
