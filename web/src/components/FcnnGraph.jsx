import { useEffect } from "react";
import { MultiDirectedGraph } from "graphology";
import {
	SigmaContainer,
	useLoadGraph,
	useSigma,
	useSetSettings,
} from "@react-sigma/core";
import { DEFAULT_NODE_PROGRAM_CLASSES } from "sigma/settings";
import { NodeSquareProgram } from "@sigma/node-square";
import { createNodeBorderProgram } from "@sigma/node-border";
import "@react-sigma/core/lib/react-sigma.min.css";
const height = 900;

export function LoadGraph({ net }) {
	const loadGraph = useLoadGraph();
	const sigma = useSigma();
	const setSettings = useSetSettings();

	useEffect(() => {
		setSettings({
			zoomToSizeRatioFunction: (ratio) => ratio,
			itemSizesReference: "positions",
			autoRescale: true,
			labelDensity: 0,
			nodeProgramClasses: {
				...DEFAULT_NODE_PROGRAM_CLASSES,
				square: NodeSquareProgram,
				bordered: createNodeBorderProgram({
					borders: [
						{
							size: {
								attribute: "borderSize",
								defaultValue: 0.5,
							},
							color: { attribute: "borderColor" },
						},
						{ size: { fill: true }, color: { attribute: "color" } },
					],
				}),
			},
		});

		const graph = new MultiDirectedGraph();
		// calculate the position of the nodes for input
		const input_length = net.input.length;
		const input_gap = height / input_length;
		net.input.forEach((p, i) => {
			const y = 250 + input_gap * (i - input_length / 2);
			graph.addNode(`input_${i}`, {
				x: 0,
				y: y,
				label: `${p.toFixed(0)}`,
				color: p != 0.0 ? "#000000" : "#eeeeee",
				size: 3,
				type: "square",
			});
		});

		// calculate the position of the nodes for A1, middle is 250px from the top
		const A1_length = net.A1.length;
		const A1_gap = height / A1_length;
		net.A1.forEach((p, i) => {
			const y = 250 + A1_gap * (i - A1_length / 2);
			graph.addNode(`A1_${i}`, {
				x: 300,
				y: y,
				label: `${p.toFixed(2)}`,
				color: p != 0.0 ? "#000000" : "#ffffff",
				size: 20,
				type: "bordered",
				borderColor: "#000000",
				borderSize: 0.1,
			});
		});

		// calculate the position of the nodes for A2
		const A2_length = net.A2.length;
		const A2_gap = height / A2_length;
		net.A2.forEach((p, i) => {
			const y = 250 + A2_gap * (i - A2_length / 2);
			graph.addNode(`A2_${i}`, {
				x: 600,
				y: y,
				label: `${p.toFixed(2)}`,
				color: p != 0.0 ? "#000000" : "#ffffff",
				size: 20,
				type: "bordered",
				borderColor: "#000000",
				borderSize: 0.1,
			});
		});

		// calculate the position of the nodes for Z3
		const Z3_length = net.prediction.length;
		const Z3_gap = height / Z3_length;
		net.prediction.forEach((p, i) => {
			const y = 250 + Z3_gap * (9 - i - Z3_length / 2);
			graph.addNode(`Z3_${i}`, {
				x: 900,
				y: y,
				label: `${i}: ${p.toFixed(2)}`,
				color: p > 0.5 ? "#000000" : "#ffffff",
				forceLabel: true,
				size: 20,
				type: "bordered",
				borderColor: "#000000",
				borderSize: 0.1,
			});
		});

		net.input.forEach((p, input_i) => {
			net.A1.forEach((p2, A1_i) => {
				if (p != 0.0 && p2 != 0.0) {
					graph.addEdge(`input_${input_i}`, `A1_${A1_i}`);
				}
			});
		});

		net.A1.forEach((p, A1_i) => {
			net.A2.forEach((p2, A2_i) => {
				if (p != 0.0 && p2 != 0.0) {
					graph.addEdge(`A1_${A1_i}`, `A2_${A2_i}`, {
						color: "#aaaaaa",
					});
				}
			});
		});

		net.A2.forEach((p, A2_i) => {
			net.prediction.forEach((p2, Z3_i) => {
				if (p != 0.0 && p2.toFixed(2) != "0.00") {
					graph.addEdge(`A2_${A2_i}`, `Z3_${Z3_i}`, {
						color: "#aaaaaa",
					});
				}
			});
		});

		loadGraph(graph);
		sigma.scheduleRefresh();
		sigma.getCamera().disable();
	}, [loadGraph, net]);

	return null;
}

// Component that display the graph
export function DisplayGraph({ net }) {
	return (
		<div className="h-[300px] w-full pr-10">
			<SigmaContainer>
				<LoadGraph net={net} />
			</SigmaContainer>
		</div>
	);
}
