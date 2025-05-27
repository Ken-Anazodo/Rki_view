import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "../utils/test-utils";
import SignUpForm from "./SignUpForm";

test("renders signup form and submit", ()=>{
	render(<SignUpForm />);
	fireEvent.change(screen.getByPlaceholderText("First name *"), {target: {value: "Jane"}});
	fireEvent.change(screen.getByPlaceholderText("Last name *"), {target: {value: "Bridges"}});
	fireEvent.change(screen.getByPlaceholderText("Username *"), {target: {value: "janeB"}});
	fireEvent.change(screen.getByPlaceholderText("Contact Number *"), {target: {value: "09044567543"}});
	
	const elements = screen.getAllByText(/Sign Up/i);
	elements.forEach(el => {
		expect(el).toBeInTheDocument();
	});
})

