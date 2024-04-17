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
   */
  private loadCollection(): void {
    this.collection = Array.from(this.fileManager.load().values());
  }

  /**
   * Método para añadir una carta a la colección de forma asíncrona.
   * @param {Card} card La carta que se va a añadir a la colección.
   * @returns {Promise<void>} Una promesa que se resuelve cuando se completa la operación de añadir la carta.
   */
  public addCard(card: Card): Promise<void> {
    return new Promise((resolve, reject) => {
      // Comprobamos si la carta ya existe en la colección
      if (this.collection.some(c => c.id === card.id)) {
        reject(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`);
      } else {
        // Si no existe, la añadimos a la colección y la guardamos en el sistema de archivos
        this.collection.push(card);
        const filePath = this.fileManager.getFilePath(card.id);
        fs.promises.writeFile(filePath, JSON.stringify(card, null, 2))
          .then(() => {
            console.log(chalk.green.bold(`Nueva carta añadida a la colección de ${this.user}.`));
            resolve();
          })
          .catch(reject);
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
        // Si existe, la actualizamos en la colección y la guardamos en el sistema de archivos
        this.collection[cardIndex] = updatedCard;
        // Guardamos la carta en el sistema de archivos
        fs.promises.writeFile(this.fileManager.getFilePath(updatedCard.id), JSON.stringify(updatedCard, null, 2))
          .then(() => {
            console.log(chalk.green.bold(`Carta actualizada en la colección de ${this.user}.`));
            resolve();
          })
          .catch(reject);
      }
    });
  }
}
