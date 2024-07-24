describe("Book Social Network Tests", () => {
  it("should load the home page", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Book Social Network");
  });

  it("Should hover over Profile and click Login", () => {
    // Навигирайте до страницата
    cy.visit("localhost:5173/");

    // Симулирайте hover върху елемента Profile
    cy.get(".profile").trigger("mouseover");

    // Проверете дали Login става видим и кликнете върху него
    cy.contains("Log in").should("be.visible").click();

    // Проверете дали страницата за логин се зарежда правилно
    cy.url().should("include", "/login");
  });

  it("should log in successfully", () => {
    cy.visit("http://localhost:5173/login");
    cy.get('input[type="email"]').type("test@test.com");
    cy.get('input[type="password"]').type("testtest");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/profile");
  });

  it("should search for a book", () => {
    cy.visit("http://localhost:5173/search");
    cy.get('input[type="text"]').type("test");
    cy.contains("button", "Search").click();
    cy.contains("test");
  });
});
