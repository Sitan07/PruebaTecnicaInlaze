describe('Verificar que el usuario pueda loguearse con el email y contraseña correctos', () => {
    it('Permitir al usuario iniciar sesión con email y contraseña válidos', () => {
      cy.visit('https://test-qa.inlaze.com/');
      cy.get('#email').type('juan.perez@inlanze.com');
      cy.get('#password').type('Password123*');  
      cy.get('button[type="submit"]').click();
    });
});

describe('Validar que el formulario de login no se envíe si los campos no están completos', () => {
    it('El botón Sing In no se habilita si el campo de email no está completo', () => {
        cy.visit('https://test-qa.inlaze.com/');
        cy.get('#email').type('juan.perez@inlanze.com');
        // Omitir el campo de contraseña
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('El botón Sing In no se habilita si el campo de password no está completo', () => {
      cy.visit('https://test-qa.inlaze.com/');
      // Omitir el campo de email
      cy.get('#password').type('Password123*');
      cy.get('button[type="submit"]').should('be.disabled');
    });
});

describe('Comprobar que al ingresar se muestre el nombre del usuario', () => {
    it('Al ingresar a la plataforma, debe mostrarse el nombre del usuario', () => {
      cy.visit('https://test-qa.inlaze.com/');
      cy.get('#email').type('juan.perez@inlanze.com');
      cy.get('#password').type('Password123*');  
      cy.get('button[type="submit"]').click();
      cy.contains('Juan Pérez').should('be.visible');
    });
});

describe('Verificar que la plataforma permita cerrar la sesión correctamente', () => {
    it.only('El sistema permite cerrar sesión correctamente', () => {
      cy.visit('https://test-qa.inlaze.com/');
      cy.get('#email').type('juan.perez@inlanze.com');
      cy.get('#password').type('Password123*');  
      cy.get('button[type="submit"]').click();
      cy.wait(2000);
      cy.get('.avatar').click();
      cy.wait(2000);
      cy.get('li a').contains('Logout').click();
          
    });
});