describe('Verificar que se pueda registrar un usuario con nombre, email y contraseña válidos.', () => {
    it('Registrar un usuario con nombre, email y contraseña válidos', () => {
      cy.visit('https://test-qa.inlaze.com/');
      cy.get('a[href="/auth/sign-up"]').click();
      cy.wait(2000);
      cy.get('#full-name').type('Juan Pérez');
      cy.get('#email').type('juan.perez@inlanze.com');
      cy.get('#password').type('Password123*');
      cy.get('#confirm-password').type('Password123*');
      cy.get('button[type="submit"]').click();
      cy.contains('Successful registration!').should('be.visible');
    });
});

describe('Validar que el campo de nombre acepte mínimo 2 palabras', () => {
    it('El botón Sing Up no se habilita si el nombre no tiene mínimo 2 palabras', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan');
        cy.get('#email').type('juan.perez@inlanze.com');
        cy.get('#password').type('Password123*');
        cy.get('#confirm-password').type('Password123*');
        cy.get('button[type="submit"]').should('be.disabled');
    });
});

describe('Verificar que el email cumpla con el formato estándar y sea único en la base de datos.', () => {
    it('Mostrar un error si el email no tiene un formato válido', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan Pérez');
        cy.get('#email').type('juan.perez.com');
        cy.get('#password').type('Password123*');
        cy.get('#confirm-password').type('Password123*');
        cy.get('button[type="submit"]').click();
        cy.contains('El email ingresado es invalido').should('be.visible');
    });
  
    it('Mostrar un error si el email ya está registrado', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan Pérez');
        cy.get('#email').type('juan.perez@inlanze.com');
        cy.get('#password').type('Password123*');
        cy.get('#confirm-password').type('Password123*');
        cy.get('button[type="submit"]').click();
      cy.contains('El email ya está en uso').should('be.visible');
    });
});

describe('Validar que la contraseña cumpla con los requisitos de longitud y caracteres.', () => {
    it('El botón Sing Up no se habilita si la contraseña no cumple con los requisitos', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan Pérez');
        cy.get('#email').type('juan.perez@inlanze.com');
        cy.get('#password').type('12345678');
        cy.get('#confirm-password').type('12345678');
        cy.get('button[type="submit"]').should('be.disabled');
    });
});

describe('Comprobar que el formulario no se envíe si los campos obligatorios no están completos', () => {
    it('El botón Sing Up no se habilita si los campos obligatorios no están completos', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan Pérez');
        // Omitir el campo de email
        cy.get('#password').type('Password123*');
        cy.get('#confirm-password').type('Password123*');
        cy.get('button[type="submit"]').should('be.disabled');
    });
});

describe('Verificar que el sistema informe si las contraseñas ingresadas no coinciden', () => {
    it('Mostrar un error y el botón Sing Up no se habilita si las contraseñas no coinciden', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);
        cy.get('#full-name').type('Juan Pérez');
        cy.get('#email').type('juan.perez@inlanze.com');
        cy.get('#password').type('Password123*');
        cy.get('#confirm-password').type('Password');
        cy.contains('Passwords do not match').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
    });
});