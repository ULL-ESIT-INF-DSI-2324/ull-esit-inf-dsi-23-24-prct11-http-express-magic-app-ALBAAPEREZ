import 'mocha';
import { expect } from 'chai';
import { CardCollection } from '../../src/MODIFICACION/metodos_promesas.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { FileManager } from '../../src/EJERCICIO/FileManager.js';
import * as fs from 'fs';
import * as path from 'path';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';

// PRUEBAS PARA LA CLASE CardCollection
describe('CardCollection', () => {
  // Creamos una instancia de la clase CardCollection
  let cardCollection: CardCollection;
  beforeEach(() => {
    cardCollection = new CardCollection('test');
  });
  // comporbamos que sea una clase
  it('Debería ser una clase', () => {
    expect(CardCollection).to.be.a('function');
  });

  // comprobamos que add y update sean funciones
  it('Debería tener las funciones addCard y updateCard', () => {
    expect(cardCollection.addCard).to.be.a('function');
    expect(cardCollection.updateCard).to.be.a('function');
  });
});

// PRUEBAS PARA LA FUNCION ADDCARD
describe('Pruebas de funciones asíncronas de CardCollection', () => {
  // Utilizamos una instancia de FileManager ficticia para las pruebas
  const fileManager = new FileManager('usuario_prueba');
  // Creamos una instancia de CardCollection para las pruebas
  const cardCollection = new CardCollection('usuario_prueba');
  
    /// Definimos una carta de ejemplo para las pruebas
  const exampleCard: Card = { 
    id: Math.floor(Math.random() * 10000) + 1000, // Cambiamos el ID para que sea único
    name: 'carta1', 
    color: Color.Blanco,
    manaCost: 1, 
    cardType: LineType.Criatura, 
    rarity: Rarity.Comun,
    rulesText: 'Some rules text', 
    marketValue: 0.01 
  };

  // prueba para comporbar que usa promesas
  it('addCard debería devolver una promesa', () => {
    const result = cardCollection.addCard(exampleCard);
    expect(result).to.be.instanceOf(Promise);
  });

  // comporbamos que es una funcion
  it('addCard debería ser una función', () => {
    expect(cardCollection.addCard).to.be.a('function');
  });

  // Prueba que comprueba que no devuelva tipos de datos incorrectos
  it('addCard no debería devolver un número', () => {
    const result = cardCollection.addCard(exampleCard);
    expect(result).to.not.be.a('number');
    expect(result).to.not.be.a('string');
    expect(result).to.not.be.a('boolean');
    expect(result).to.not.be.a('object');
  });

});

// PRUEBAS PARA LA FUNCION UPDATECARD
describe('Pruebas de funciones asíncronas de CardCollection', () => {
  // Utilizamos una instancia de FileManager ficticia para las pruebas
  const fileManager = new FileManager('usuario_prueba');
  // Creamos una instancia de CardCollection para las pruebas
  const cardCollection = new CardCollection('usuario_prueba');
  
  // Definimos una carta de ejemplo para las pruebas
  const exampleCard: Card = { 
    id: 999, 
    name: 'carta4', 
    color: Color.Amarillo,
    manaCost: 1, 
    cardType: LineType.Criatura, 
    rarity: Rarity.Rara,
    rulesText: 'Some rules text', 
    marketValue: 0.01 
  };

  const nonExistentCard: Card = {
    id: 9999, 
    name: 'carta1', 
    color: Color.Blanco,
    manaCost: 1, 
    cardType: LineType.Criatura, 
    rarity: Rarity.Comun,
    rulesText: 'Some rules text', 
    marketValue: 0.01 
  };

  // prueba para comporbar que usa promesas
  it('updateCard debería devolver una promesa', () => {
    const result = cardCollection.updateCard(exampleCard);
    expect(result).to.be.instanceOf(Promise);
  });

  // comporbamos que es una funcion
  it('updateCard debería ser una función', () => {
    expect(cardCollection.updateCard).to.be.a('function');
  });

  // Prueba que comprueba que no devuelva tipos de datos incorrectos
  it('updateCard no debería devolver un número', () => {
    const result = cardCollection.updateCard(exampleCard);
    expect(result).to.not.be.a('number');
    expect(result).to.not.be.a('string');
    expect(result).to.not.be.a('boolean');
    expect(result).to.not.be.a('object');
  });
  
});
