import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { mouseDownAtom, mousePositionAtom } from "../states/MouseEvents";
import { isUsingPencilAtom } from "../states/DrawingTools";
import { boardStateAtom } from "../states/Board";

export default function DrawingBoard() {
	const [boardState, setBoardState] = useAtom(boardStateAtom);
	const [mousePosition] = useAtom(mousePositionAtom);
	const [mouseDown] = useAtom(mouseDownAtom);
	const [isUsingPencil] = useAtom(isUsingPencilAtom);
	const boardRef = useRef(null);
	const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (!mouseDown) {
			setLastPosition({ x: -1, y: -1 });
			return;
		}

		const board = boardRef.current;
		const boardOffset = board.getBoundingClientRect();
		const cellWidth = board.clientWidth / 28;
		const cellHeight = board.clientHeight / 28;
		const cellX = Math.floor(
			(mousePosition.x - boardOffset.left) / cellWidth
		);
		const cellY = Math.floor(
			(mousePosition.y - boardOffset.top) / cellHeight
		);

		if (cellX < 0 || cellX > 27 || cellY < 0 || cellY > 27) {
			setLastPosition({ x: -1, y: -1 });
			return;
		}

		let newBoardState = boardState.map((col) => col.map((row) => row));

		if (lastPosition.x !== -1) {
			newBoardState = drawBresenhamLine(
				lastPosition.x,
				lastPosition.y,
				cellX,
				cellY,
				isUsingPencil,
				newBoardState
			);
		} else {
			newBoardState = drawPoint(
				cellX,
				cellY,
				isUsingPencil,
				newBoardState
			);
		}

		setLastPosition({ x: cellX, y: cellY });
		setBoardState(newBoardState);
	}, [mousePosition, mouseDown]);

	return (
		<div
			ref={boardRef}
			className="w-fit h-fit grid grid-rows-[repeat(28,1fr)] grid-cols-[repeat(28,1fr)] border-r-[0.5px] border-b-[0.5px] border-slate-700"
		>
			{boardState.map((col, y) => (
				<div key={y} className="w-3 h-3">
					{col.map((row, x) => (
						<div
							key={x}
							className={`w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-slate-700 transition-all duration-75 ${
								row ? "bg-black" : ""
							}`}
						></div>
					))}
				</div>
			))}
		</div>
	);
}

function drawPoint(x, y, isUsingPencil, newBoardState) {
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const newX = x + i;
			const newY = y + j;

			if (newX >= 0 && newX < 28 && newY >= 0 && newY < 28) {
				if (Math.abs(i) + Math.abs(j) <= 1) {
					newBoardState[newX][newY] = isUsingPencil;
				}
			}
		}
	}
	return newBoardState;
}

function drawBresenhamLine(x0, y0, x1, y1, isUsingPencil, newBoardState) {
	const dx = Math.abs(x1 - x0);
	const dy = Math.abs(y1 - y0);
	const sx = x0 < x1 ? 1 : -1;
	const sy = y0 < y1 ? 1 : -1;
	let err = dx - dy;

	while (true) {
		if (x0 >= 0 && x0 < 28 && y0 >= 0 && y0 < 28) {
			newBoardState = drawPoint(x0, y0, isUsingPencil, newBoardState);
		}

		if (x0 === x1 && y0 === y1) break;
		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x0 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y0 += sy;
		}
	}
	return newBoardState;
}
