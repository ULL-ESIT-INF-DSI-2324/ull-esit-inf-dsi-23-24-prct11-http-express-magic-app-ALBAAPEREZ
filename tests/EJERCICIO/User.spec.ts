// PRUEBAS PARA LA CLASE CARD COLLECTION

import 'mocha';
import { expect } from 'chai';
import { CardCollection } from '../../src/EJERCICIO/User.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import * as fs from 'fs';
import sinon from 'sinon';
import path from 'path';


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

  // TIENE UN CONSTRUCTOR
  it('Debería tener un constructor', () => {
    expect(cardCollection.constructor).to.be.a('function');
  });

  // TIENE UN METODO addCard
  it('Debería tener un método addCard', () => {
    expect(cardCollection.addCard).to.be.a('function');
  });

  // TIENE UN METODO updateCard
  it('Debería tener un método updateCard', () => {
    expect(cardCollection.updateCard).to.be.a('function');
  });

  // TIENE UN METODO RemoveCard
  it('Debería tener un método removeCard', () => {
    expect(cardCollection.removeCard).to.be.a('function');
  });

  // TIENE UN METODO ListCards
  it('Debería tener un método listCards', () => {
    expect(cardCollection.listCards).to.be.a('function');
  });

  // TIENE UN METODO READCARD
  it('Debería tener un método readCard', () => {
    expect(cardCollection.readCard).to.be.a('function');
  });

  // PRUEBAS PARA LA FUNCIÓN addCard DE LA CLASE CardCollection
  describe('addCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que addCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.addCard).to.be.a('function');
    });      

  });

  // PRUEBAS PARA LA FUNCIÓN updateCard DE LA CLASE CardCollection
  describe('updateCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que updateCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.updateCard).to.be.a('function');
    });
  });

  // PRUEBAS PARA LA FUNCIÓN removeCard DE LA CLASE CardCollection
  describe('removeCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que removeCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.removeCard).to.be.a('function');
    });

  });

  // PRUEBAS PARA LA FUNCIÓN listCards DE LA CLASE CardCollection
  describe('listCards', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que listCards sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.listCards).to.be.a('function');
    });

  });

  // PRUEBAS PARA LA FUNCIÓN readCard DE LA CLASE CardCollection
  describe('readCard', () => {
    // Creamos una instancia de la clase CardCollection
    let cardCollection: CardCollection;
    beforeEach(() => {
      cardCollection = new CardCollection('test');
    });

    // Comprobamos que readCard sea una función
    it('Debería ser una función', () => {
      expect(cardCollection.readCard).to.be.a('function');
    });

  });

});