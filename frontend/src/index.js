import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./root";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Lobby from "./pages/lobby";
import Match from "./pages/match";
import PreLobby from './pages/prelobby';
import ErrorPage from './pages/errorpage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <PreLobby />,
	},
	{
		path: "/:matchId",
		element: <Lobby />,
	},
	{
		path: "/spiel/:matchId",
		element: <Match />,
	},
	{
		path: "/error",
		element: <ErrorPage />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Root>
			<RouterProvider router={router} />
		</Root>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
