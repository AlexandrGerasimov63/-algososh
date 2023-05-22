import {BASE_URL} from '../constant/constant'

describe('Сервис запущен', function() {
  it(`Сервис запущен на ${BASE_URL}`, function() {
    cy.visit('/');
    
  });
}); 