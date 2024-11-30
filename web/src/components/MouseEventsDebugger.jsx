import { useAtom } from "jotai";
import { mouseDownAtom, mousePositionAtom } from "../states/MouseEvents";

export default function MouseEventsDebugger() {
	const [mouseDown] = useAtom(mouseDownAtom);
	const [mousePosition] = useAtom(mousePositionAtom);
	return (
		<div className="w-auto flex flex-col justify-center items-center">
			<div>{mouseDown ? "cursor down" : "cursor up"}</div>
			<div>
				{mousePosition.x}, {mousePosition.y}
			</div>
		</div>
	);
}
