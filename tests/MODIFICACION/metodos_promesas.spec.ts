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
  // comprobamos que el constructor inicializa los atributos
  it('Debería inicializar los atributos', () => {
    expect(cardCollection.user).to.equal('test');
    expect(cardCollection.fileManager).to.be.instanceOf(FileManager);
    expect(cardCollection.collection).to.be.an('array');
  });
  // comprobamos que el metodo loadCollection carga la coleccion
  it('Debería cargar la colección', () => {
    expect(cardCollection.collection).to.be.an('array');
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

  // Prueba de la función asíncrona addCard
  it('addCard debería añadir una carta a la colección', () => {
    return cardCollection.addCard(exampleCard).then(() => {
      // Verificar que la carta fue añadida correctamente
      const filePath = fileManager.getFilePath(exampleCard.id);
      const cardExists = fs.existsSync(filePath);
      expect(cardExists).to.be.true;
    }).catch((error) => {
      // Si la promesa se rechaza, la prueba debería fallar
      throw new Error(`Error inesperado: ${error}`);
    });
  });

  // Prueba de la función asíncrona addCard con una carta que ya existe
  it('addCard debería rechazar la promesa si la carta ya existe', () => {
    return cardCollection.addCard(exampleCard).then(() => {
      // Si la promesa se resuelve, la prueba debería fallar
      throw new Error('Error inesperado: la carta ya existe.');
    }).catch((error) => {
      // Verificar que la promesa fue rechazada
      expect(error).to.equal(`La carta con ID ${exampleCard.id} ya existe en la colección de usuario_prueba.`);
    });
  });

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
  
  /// Prueba de la función asíncrona updateCard
  it('updateCard debería actualizar la carta en la colección y guardarla en el sistema de archivos', async () => {
    // Definimos una carta original y la añadimos a la colección
    const originalCard: Card = { 
      id: 999, 
      name: 'carta4', 
      color: Color.Amarillo,
      manaCost: 1,
      cardType: LineType.Criatura, 
      rarity: Rarity.Rara,
      rulesText: 'Some rules text', 
      marketValue: 0.01
    };
    // Verificamos si la carta ya existe en la colección
    const existingCard = cardCollection.collection.find(card => card.id === originalCard.id);
    if (!existingCard) {
      // Si la carta no existe, la añadimos a la colección
      await cardCollection.addCard(originalCard);
    }
    // Definimos una carta actualizada
    const updatedCard: Card = { 
      ...originalCard,
      manaCost: 2, // Cambiamos el costo de mana
      marketValue: 0.02 // Cambiamos el valor de mercado
    };
    // Actualizamos la carta
    await cardCollection.updateCard(updatedCard);
    // Verificar que la carta fue actualizada correctamente en la colección
    const updatedCardInCollection = cardCollection.collection.find(card => card.id === updatedCard.id);
    expect(updatedCardInCollection).to.deep.equal(updatedCard);
    // Verificar que la carta fue guardada correctamente en el sistema de archivos
    const savedCard = JSON.parse(await fs.promises.readFile(cardCollection.fileManager.getFilePath(updatedCard.id), 'utf8'));
    expect(savedCard).to.deep.equal(updatedCard);
  });

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
  
  // Prueba de la función asíncrona updateCard
  it('updateCard debería rechazar la promesa si la carta no existe', () => {
    return cardCollection.updateCard(nonExistentCard).then(() => {
      // Si la promesa se resuelve, la prueba debería fallar
      throw new Error('Error inesperado: la carta existe.');
    }).catch((error) => {
      // Verificar que la promesa fue rechazada con el error correcto
      expect(error).to.equal(`La carta con ID ${nonExistentCard.id} no existe en la colección de usuario_prueba.`);
    });
  });
});
