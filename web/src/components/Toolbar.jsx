// Toolbar with radio buttons for pencil and eraser

import { useAtom } from "jotai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { isUsingPencilAtom } from "../states/DrawingTools";
import { boardStateAtom } from "../states/Board";
export default function Toolbar() {
	const [isUsingPencil, setIsUsingPencil] = useAtom(isUsingPencilAtom);
	const [, setBoardState] = useAtom(boardStateAtom);

	const handleClear = () => {
		setBoardState(Array(28).fill(Array(28).fill(false)));
		setIsUsingPencil(true);
	};

	return (
		<div className="flex flex-row justify-center">
			<button
				className={`my-2 mx-1 font-semibold px-2 border border-blue-500 rounded transition-all ${
					isUsingPencil
						? "text-white bg-blue-600 border-blue-600"
						: "text-blue-700 text-opacity-50 bg-opacity-50 border-opacity-50"
				}`}
				onClick={() => setIsUsingPencil(true)}
			>
				Pencil ✏️
			</button>
			<button
				className={`my-2 mx-1 font-semibold px-2 border border-slate-500 rounded transition-all ${
					!isUsingPencil
						? "text-white bg-slate-500"
						: "text-slate-700 bg-transparent  text-opacity-50 bg-opacity-50 border-opacity-50"
				}`}
				onClick={() => setIsUsingPencil(false)}
			>
				Eraser <FontAwesomeIcon icon={faEraser} />
			</button>
			<button
				className="my-2 mx-1 border font-semibold px-2 text-white bg-red-700 rounded transition-all hover:bg-red-900 active:border-red-900"
				onClick={handleClear}
			>
				Clear 🗑️
			</button>
		</div>
	);
}
