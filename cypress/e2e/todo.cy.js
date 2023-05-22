/// <reference types="cypress" />

describe('to-do app e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/reacttest');
  });

  it('displays empty list on start', () => {
    cy.get('[data-testid=todo-list] li').should('have.length', 0);
  });

  it('can add new todo items', () => {
    const newItem1 = 'Todo item 1';
    const newItem2 = 'Todo item 2';

    cy.get('[data-testid=input-new-todo]').type(`${newItem1}{enter}`);
    cy.get('[data-testid=todo-list] li span')
      .should('have.length', 1)
      .first()
      .should('have.text', newItem1);

    cy.get('[data-testid=input-new-todo]').type(`${newItem2}{enter}`);
    cy.get('[data-testid=todo-list] li span')
      .should('have.length', 2)
      .first()
      .should('have.text', newItem2);
  });

  it('can check off an item as completed', () => {
    const newItem1 = 'Todo item 1';
    cy.get('[data-testid=input-new-todo]').type(`${newItem1}{enter}`);
    cy.contains('Todo item 1').parent().find('input[type=checkbox]').check();
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

      cy.get('[data-testid=input-new-todo]').type(`${newItem1}{enter}`);
      cy.get('[data-testid=input-new-todo]').type(`${newItem2}{enter}`);

      cy.contains('Todo item completed')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('can filter for uncompleted tasks', () => {
      cy.contains('Active').click();

      cy.get('[data-testid=todo-list] li span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Todo item active');

      cy.contains('Todo item completed').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click();

      cy.get('[data-testid=todo-list] li span')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Todo item completed');

      cy.contains('Todo item active').should('not.exist');
    });

    it('show all tasks', () => {
      cy.contains('All').click();

      cy.get('[data-testid=todo-list] li span')
        .should('have.length', 2)
        .first()
        .should('have.text', 'Todo item active');

      cy.get('[data-testid=todo-list] li span')
        .should('have.length', 2)
        .last()
        .should('have.text', 'Todo item completed');
    });

    it('can delete all completed tasks', () => {
      cy.contains('Clear Completed').click();

      cy.get('[data-testid=todo-list] li span')
        .should('have.length', 1)
        .should('not.have.text', 'Todo item completed');
    });
  });
});
