import Toolbar from "./components/Toolbar";
import DrawingBoard from "./components/DrawingBoard";
import MouseEventsDebugger from "./components/MouseEventsDebugger";
import CursorEventWrapper from "./components/CursorEventWrapper";
import PredictionResults from "./components/PredictionResults";
function App() {
	return (
		<CursorEventWrapper>
			<div className="h-screen w-screen p-10 flex flex-col items-center justify-center bg-slate-100 ">
				<PredictionResults />
				<DrawingBoard className="w-1/2 h-1/2" />
				<Toolbar />
				<MouseEventsDebugger />
			</div>
		</CursorEventWrapper>
	);
}

export default App;
