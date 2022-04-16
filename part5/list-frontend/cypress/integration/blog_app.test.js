Cypress.Commands.add("login", () => {
  cy.get("#firstLogin").click();
  cy.get("input:first").type("username");
  cy.get("input:last").type("password");
  cy.get("#login-button").click();
  cy.contains("username currently logged in");
});

Cypress.Commands.add("AddPost", () => {
  cy.contains("Create Blog").click();
  cy.get("#title").type("Lineal Regression");
  cy.get("#author").type("username");
  cy.get("#url").type("www.linealregression.com");
  cy.get("#submitBlog").click();
});
Cypress.Commands.add("AddPost2", () => {
  cy.get("#title").clear().type("Lineal Regression");
  cy.get("#author").clear().type("username");
  cy.get("#url").clear().type("www.linealregression.com");
  cy.get("#submitBlog").click();
});

describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "name",
      username: "username",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown after click button", () => {
    cy.get("#firstLogin").click();
    cy.get("input:first");
  });

  describe("login", () => {
    it("successful login attempt", () => {
      cy.login();
    });

    it("unsuccessful login attempt", () => {
      cy.get("#firstLogin").click();
      cy.get("input:first").type("wrongusername");
      cy.get("input:last").type("wrongpassword");
      cy.get("#login-button").click();
      cy.contains("Error Wrong Pass or username");
    });
  });

  describe("when logged in", () => {
    it("logged in user can create new blog", () => {
      cy.login();
      cy.AddPost();
      cy.contains("Lineal Regression");
    });

    it("logged in user can like a blogpost", () => {
      cy.login();
      cy.AddPost();
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("1");
    });

    it("logged in user can delete a blogpsot", () => {
      cy.login();
      cy.AddPost();
      cy.contains("Delete").click();
      cy.contains("Lineal Regression").should("not.exist");
    });
    it("check if the most liked blogpost is at the top", () => {
      cy.login();
      cy.AddPost();
      cy.AddPost2();
      cy.AddPost2();
      cy.get("#viewButton").contains("View").eq(0).click();

      for (let i = 0; i < 5; i++) {
        cy.get("#likeButton", { timeout: 1000 }).contains("Like").eq(0).click();
        cy.wait(3000);
      }
      cy.get("#likes").eq(0).contains("5");
    });
  });
});
