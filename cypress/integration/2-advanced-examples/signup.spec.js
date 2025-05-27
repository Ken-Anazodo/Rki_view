Cypress.on("uncaught:exception", () => {
	return false;
  });
  

describe("Sign Up Form", () => {
	beforeEach(() => {
	  cy.visit("http://localhost:5173/signup/");
	});
  
  
	it("uploads a profile image", () => {
	  // You must have a test image in your cypress/fixtures folder
	  cy.get('input[type="file"]').selectFile("cypress/fixtures/assets/img.png", { force: true });
	  cy.get("#fileName").should("exist");
	});
	
  
	it("submits the form with valid data", () => {
	  cy.intercept("POST", "**/admin_signup/**", {
		statusCode: 201,
		body: { message: "User created successfully" },
	  }).as("signupRequest");


	  cy.intercept("POST", "**", (req) => {
		console.log("Caught request:", req.url);
	  }).as("anyPost");
	  
  
	  cy.get('input[name="firstname"]').should('not.be.disabled').type("Ada");
	  cy.get('input[name="lastname"]').should('not.be.disabled').type("Lovelace");
	  cy.get('input[name="username"]').should('not.be.disabled').type("adalovelace");
	  cy.get('input[name="contactNo"]').should('not.be.disabled').type("08012345678");
	  cy.get('input[name="email"]').should('not.be.disabled').type("ada@example.com");
	  cy.get('input[name="password"]').should('not.be.disabled').type("securePass123!");
	  cy.get('input[name="confirmPassword"]').should('not.be.disabled').type("securePass123!");
	  cy.get('input[type="file"]').selectFile("cypress/fixtures/assets/img.png", { force: true });
  
	  cy.get('button[type="submit"]').should('not.be.disabled').click();
  
	  cy.wait("@signupRequest").its("response.statusCode").should("eq", 201);
	  cy.wait("@anyPost");

	  cy.contains("User created successfully").should("exist");
	});
  });
  