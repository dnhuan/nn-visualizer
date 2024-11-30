import { atom } from "jotai";

export const boardStateAtom = atom(Array(28).fill(Array(28).fill(false)));
