import { useAtom } from "jotai";
import { mousePositionAtom, mouseDownAtom } from "../states/MouseEvents";

export default function CursorEventWrapper({ children }) {
	const [, setMousePosition] = useAtom(mousePositionAtom);
	const [, setMouseDown] = useAtom(mouseDownAtom);

	return (
		<div
			className="user-select-none touch-none"
			onMouseDown={(e) => {
				e.preventDefault();
				e.nativeEvent.preventDefault();
				setMouseDown(true);
			}}
			onMouseUp={(e) => {
				e.preventDefault();
				e.nativeEvent.preventDefault();
				setMouseDown(false);
			}}
			onMouseLeave={(e) => {
				e.preventDefault();
				setMouseDown(false);
			}}
			onMouseMove={(e) => {
				e.preventDefault();
				setMousePosition({
					x: e.clientX,
					y: e.clientY,
				});
			}}
			onTouchStart={(e) => {
				setMouseDown(true);
				setMousePosition({
					x: e.changedTouches[0].clientX,
					y: e.changedTouches[0].clientY,
				});
			}}
			onTouchEnd={(e) => {
				setMouseDown(false);
				setMousePosition({
					x: e.changedTouches[0].clientX,
					y: e.changedTouches[0].clientY,
				});
			}}
			onTouchMove={(e) => {
				setMousePosition({
					x: e.changedTouches[0].clientX,
					y: e.changedTouches[0].clientY,
				});
			}}
		>
			{children}
		</div>
	);
}
