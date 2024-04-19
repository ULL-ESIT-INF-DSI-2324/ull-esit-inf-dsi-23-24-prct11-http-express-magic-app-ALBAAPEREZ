// PRUEBAS A LA FUNCION FORMAT CARD

import 'mocha';
import { expect } from 'chai';
import { JSONtoCard } from '../../src/EJERCICIO/Format_Card.js';

// PRUEBAS PARA LA FUNCION FORMATCARD
describe('JSONtoCard', () => {
  // comprobamos que sea una función
  it('JSONtoCard debería ser una función', () => {
    expect(JSONtoCard).to.be.a('function');
  });

  // comprobamos que recibe un objeto
  it('JSONtoCard debería recibir un objeto', () => {
    const card = JSONtoCard({});
    expect(card).to.be.an('object');
  });

  // comprobamos que recibe un objeto con las propiedades correctas
  it('JSONtoCard debería recibir un objeto con las propiedades correctas', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('color');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });

  // comprobamos que recibe un objeto con las propiedades correctas y los valores correctos
  it('JSONtoCard debería recibir un objeto con las propiedades correctas y los valores correctos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.be.a('number');
    expect(card.name).to.be.a('string');
    expect(card.color).to.be.a('string');
    expect(card.manaCost).to.be.a('number');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
    expect(card.rulesText).to.be.a('string');
    expect(card.marketValue).to.be.a('number');
  });

  // comporbamos que sea una funcion
  it('JSONtoCard debería ser una función', () => {
    expect(JSONtoCard).to.be.a('function');
  });

  // comprobamos que no devuelva undefined
  it('JSONtoCard no debería devolver undefined', () => {
    const card = JSONtoCard({});
    expect(card).to.not.be.undefined;
  });

  // no devuelva tipos incorrectods
  it('JSONtoCard no debería devolver tipos incorrectos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.not.be.a('string');
    expect(card.name).to.not.be.a('number');
    expect(card.color).to.not.be.a('number');
    expect(card.manaCost).to.not.be.a('string');
    expect(card.cardType).to.not.be.a('number');
    expect(card.rarity).to.not.be.a('number');
    expect(card.rulesText).to.not.be.a('number');
    expect(card.marketValue).to.not.be.a('string');
  });
  // TIENE QUE DEVOLVER UN OBJETO
  it('JSONtoCard debería devolver un objeto', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.be.an('object');
  });

  // tiene 11 propiedades
  it('JSONtoCard debería tener 11 propiedades', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(Object.keys(card).length).to.equal(11);
  });

  // tiene las propiedades correctas
  it('JSONtoCard debería tener las propiedades correctas', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('color');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });

  // tiene los valores correctos
  it('JSONtoCard debería tener los valores correctos', () => {
    const card = JSONtoCard({
      id: 1,
      name: 'test',
      color: 'Blanco',
      manaCost: 1,
      cardType: 'Criatura',
      rarity: 'Comun',
      rulesText: 'Some rules text',
      marketValue: 0.01
    });
    expect(card.id).to.equal(1);
    expect(card.name).to.equal('test');
    expect(card.color).to.equal('Blanco');
    expect(card.manaCost).to.equal(1);
    expect(card.cardType).to.equal('Criatura');
    expect(card.rarity).to.equal('Comun');
    expect(card.rulesText).to.equal('Some rules text');
    expect(card.marketValue).to.equal(0.01);
  });
});
