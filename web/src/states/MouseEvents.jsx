import { atom } from "jotai";

export const mouseDownAtom = atom(false);
export const mousePositionAtom = atom({
	x: 0,
	y: 0,
});
