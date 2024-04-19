import chalk from 'chalk';
import { Card } from './../EJERCICIO/Card.js';
import { FileManager } from './../EJERCICIO/FileManager.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase CardCollection que contiene los métodos add y load en su versión con promesas.
 * Contiene un constructor que se encarga de inicializar.
 */
export class CardCollection {
  user: string;
  fileManager: FileManager;
  collection: Card[];

  /**
   * Constructor de la clase CardCOllection
   */
  constructor(user: string) {
    this.user = user;
    this.fileManager = new FileManager(user);
    this.loadCollection();
  }

  /**
   * Metodo que caga el contenido de un fichero
   * Lo que hace es leer los archivos de las cartas y guardarlas en la colección
   */
  private loadCollection(): void {
    this.fileManager.load((error, collection) => {
      if (error) {
        console.error(`Error loading collection: ${error}`);
      } else if (collection) {
        this.collection = Array.from(collection.values());
      }
    });
  }

  /**
   * Método para añadir una carta a la colección de forma asíncrona.
   * Lo que hace es añadir la carta a la colección y guardarla en el sistema de archivos.
   * @param card card: Card - Carta que se va a añadir a la colección
   * @param {Card} card La carta que se va a añadir a la colección.
   * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación de añadir la carta.
   */
  public addCard(card: Card): Promise<void> {
    return new Promise((resolve, reject) => {
      // Comprobamos si la carta ya existe en la colección
      if (this.collection.some(c => c.id === card.id)) {
        reject(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`);
      } else {
        // Si no existe, la añadimos a la colección y obtenemos la ruta del archivo
        this.collection.push(card);
        this.fileManager.getFilePath(card.id, (error, filePath) => {
          if (error) {
            reject(error);
          } else if (filePath) {
            // Guardamos la carta en el sistema de archivos
            fs.promises.writeFile(filePath, JSON.stringify(card, null, 2))
              .then(() => {
                console.log(chalk.green.bold(`Nueva carta añadida a la colección de ${this.user}.`));
                resolve();
              })
              .catch(reject);
          }
        });
      }
    });
  }

  /**
   * Método para actualizar una carta en la colección de forma asíncrona.
   * @param {Card} updatedCard La carta actualizada que se va a añadir a la colección.
   * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación de actualizar la carta.
   */
  public updateCard(updatedCard: Card): Promise<void> {
    return new Promise((resolve, reject) => {
      // Buscamos la carta en la colección
      const cardIndex = this.collection.findIndex(c => c.id === updatedCard.id);
      // Si no existe, rechazamos la promesa
      if (cardIndex === -1) {
        reject(`La carta con ID ${updatedCard.id} no existe en la colección de ${this.user}.`);
      } else {
        // Si existe, la actualizamos en la colección y obtenemos la ruta del archivo
        this.collection[cardIndex] = updatedCard;
        this.fileManager.getFilePath(updatedCard.id, (error, filePath) => {
          if (error) {
            reject(error);
          } else if (filePath) {
            // Guardamos la carta en el sistema de archivos
            fs.promises.writeFile(filePath, JSON.stringify(updatedCard, null, 2))
              .then(() => {
                console.log(chalk.green.bold(`Carta actualizada en la colección de ${this.user}.`));
                resolve();
              })
              .catch(reject);
          }
        });
      }
    });
  }
}
