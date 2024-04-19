// PRUEBAS PARA FILE MANAGER

import 'mocha';
import { expect } from 'chai';
import { FileManager } from '../../src/EJERCICIO/FileManager.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import * as fs from 'fs';
import sinon from 'sinon';


// PRUEBAS PARA LA CLASE FileManager
describe('FileManager', () => {
  // Creamos una instancia de la clase FileManager
  let fileManager: FileManager;
  beforeEach(() => {
    fileManager = new FileManager('test');
  });
  // comprobamos que sea una clase
  it('Debería ser una clase', () => {
    expect(FileManager).to.be.a('function');
  });

  // comprobamos que getUserDir y getFilePath sean funciones
  it('Debería tener las funciones getUserDir y getFilePath', () => {
    expect(fileManager.getUserDir).to.be.a('function');
    expect(fileManager.getFilePath).to.be.a('function');
  });

  // Se utiliza el patron callback para obtener el directorio del usuario
  it('getUserDir debería obtener el directorio del usuario', (done) => {
    fileManager.getUserDir((error, userDir) => {
      expect(error).to.be.undefined;
      expect(userDir).to.be.a('string');
      done();
    });
  });

  // save debería ser una función
  it('save debería ser una función', () => {
    expect(fileManager.save).to.be.a('function');
  });

  // getFilePath debería obtener la ruta de un archivo
  it('getFilePath debería obtener la ruta de un archivo', (done) => {
    fileManager.getFilePath(1, (error, filePath) => {
      expect(error).to.be.undefined;
      expect(filePath).to.be.a('string');
      done();
    });
  });

  // save debería guardar la colección de cartas en archivos
  it('save debería guardar la colección de cartas en archivos', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // save hace uso de los callbacks
  it('save debería hacer uso de los callbacks', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // save debería llamar a writeFiles
  it('save debería llamar a writeFiles', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });
  
  // writeFiles debería escribir los archivos de las cartas
  it('writeFiles debería escribir los archivos de las cartas', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // writeFiles hace uso de los callbacks
  it('writeFiles debería hacer uso de los callbacks', (done) => {
    const collection = new Map<number, Card>();
    const card: Card = {
      id: 1,
      name: 'test',
      color: Color.Azul,
      manaCost: 1,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Some rules text',
      marketValue: 0.01
    };
    collection.set(1, card);
    fileManager.save(collection, (error) => {
      expect(error).to.be.undefined;
      done();
    });
  });
  // es una función p
  it('save debería ser una función', () => {
    expect(fileManager.save).to.be.a('function');
  });

  // load es una función
  it('load debería ser una función', () => {
    expect(fileManager.load).to.be.a('function');
  });

  // load hace uso de los callbacks
  it('load debería hacer uso de los callbacks', (done) => {
    fileManager.load((error, collection) => {
      expect(error).to.be.undefined;
      done();
    });
  });

  // load debería cargar la colección de cartas desde archivos
  it('load debería cargar la colección de cartas desde archivos', (done) => {
    fileManager.load((error, collection) => {
      expect(error).to.be.undefined;
      done();
    });
  });
});