/// <reference types="cypress" />

describe('to-do app e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/reacttest');
  });

  it('displays empty list on start', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('[data-test=todo-list] li').should('have.length', 0);
  });

  it('can add new todo items', () => {
    const newItem1 = 'Todo item 1';
    const newItem2 = 'Todo item 2';

    cy.get('[data-test=input-new-todo]').type(`${newItem1}{enter}`);
    cy.get('[data-test=todo-list] li span')
      .should('have.length', 1)
      .first()
      .should('have.text', newItem1);

    cy.get('[data-test=input-new-todo]').type(`${newItem2}{enter}`);
    cy.get('[data-test=todo-list] li span')
      .should('have.length', 2)
      .first()
      .should('have.text', newItem2);
  });

  it('can check off an item as completed', () => {
    const newItem1 = 'Todo item 1';
    cy.get('[data-test=input-new-todo]').type(`${newItem1}{enter}`);
    cy.contains('Todo item 1')
      .parent()
      .find('input[type=checkbox]')
      .check();
    cy.contains('Todo item 1')
      .parents('li')
      .should(($el) => {
        expect($el.attr('class')).to.match(/.*completed.*/);
      });
  });

  context('with a checked task', () => {
    beforeEach(() => {
      const newItem1 = 'Todo item completed';
      const newItem2 = 'Todo item active';

      cy.get('[data-test=input-new-todo]').type(`${newItem1}{enter}`);
      cy.get('[data-test=input-new-todo]').type(`${newItem2}{enter}`);

      cy.contains('Todo item completed')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get('[data-test=todo-list] li span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Todo item active');

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains('Todo item completed').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('Completed').click();

      cy.get('[data-test=todo-list] li span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Todo item completed');

      cy.contains('Todo item active').should('not.exist');
    });

    it('show all tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('All').click();

      cy.get('[data-test=todo-list] li span')
        .should('have.length', 2)
        .first()
        .should('have.text', 'Todo item active');

      cy.get('[data-test=todo-list] li span')
        .should('have.length', 2)
        .last()
        .should('have.text', 'Todo item completed');
    });

    it('can delete all completed tasks', () => {
      cy.contains('Clear Completed').click();

      cy.get('[data-test=todo-list] li span')
        .should('have.length', 1)
        .should('not.have.text', 'Todo item completed');
    });
  });
});
