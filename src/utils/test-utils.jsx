import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";

const customRender = (component, options) => {
	render(
		<Provider store={store}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>,
		options
	)
}

export * from "@testing-library/react";
export { customRender as render }