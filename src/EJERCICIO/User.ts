import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Card } from './Card.js';

/**
 * Clase para la colección de cartas de un usuario
 * Esta clase se utiliza para la gestión de la colección de cartas de un usuario
 * Cada usuario tiene su propia colección de cartas
 */
export class CardCollection {
  // Colección de cartas
  private collection: Card[] = [];
  // Nombre de usuario
  private user: string;

  /**
   * Constructor de la clase CardCollection
   * Se encarga de inicializar el nombre de usuario y cargar la colección de cartas
   * @param user user: string - Nombre de usuario
   */
  constructor(user: string) {
    this.user = user;
    // Cargar la colección de cartas
    this.loadCollection((error) => {
      if (error) {
        console.log(chalk.red.bold(`Error al cargar la colección de ${this.user}: ${error}`));
      }
    });
  }

  /**
   * Método para cargar la colección de cartas
   * Lo que hace es leer los archivos de las cartas y guardarlas en la colección
   * Si hay un error al cargar la colección, se llama al callback con el error correspondiente
   * Utiliza la función fs.readdir para leer los archivos de las cartas
   * Carga las cartas desde archivos y las guarda en la colección
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  private loadCollection(callback: (error: string | undefined) => void): void {
    const directoryPath = `./cards/${this.user}`;
    // Leer los archivos de las cartas
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        callback(`Error al leer el directorio de la colección de ${this.user}: ${err}`);
      } else {
        const cardFiles = files.filter((file) => path.extname(file) === '.json');
        const fileReadPromises: Promise<void>[] = [];
        // Leer cada archivo y añadir la carta a la colección
        cardFiles.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const readFilePromise = new Promise<void>((resolve, reject) => {
            // Leer el archivo de la carta
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                reject(`Error al leer el archivo ${file}: ${err}`);
              } else {
                // Analizar los datos del archivo
                try {
                  const cardData = JSON.parse(data);
                  const card: Card = cardData;
                  this.collection.push(card);
                  resolve();
                } catch (parseError) {
                  reject(`Error al analizar el archivo ${file}: ${parseError}`);
                }
              }
            });
          });
          fileReadPromises.push(readFilePromise);
        });
        // Esperar a que se lean todos los archivos
        Promise.all(fileReadPromises)
          .then(() => callback(undefined))
          .catch((error) => callback(error));
      }
    });
  }

  /**
   * Método para añadir una carta a la colección
   * Añade la carta a la colección y la guarda en un archivo
   * Si hay un error al añadir la carta, se llama al callback con el error correspondiente
   * Utiliza la función fs.writeFile para guardar la carta en un archivo
   * @param card card: Card - Carta a añadir a la colección
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public addCard(card: Card, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${card.id}.json`;
    // Comprobar si la carta ya existe en la colección
    fs.stat(cardFilePath, (err) => {
      if (err) {
        // Si no existe, se añade a la colección y se guarda en un archivo
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message);
          } else {
            callback(undefined);
          }
        });
      } else {
        callback(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`);
      }
    });
  }

  /**
   * Método para actualizar una carta en la colección
   * Lo que hace es actualizar la información de la carta y guardarla en un archivo
   * Si hay un error al actualizar la carta, se llama al callback con el error correspondiente
   * Utiliza la función fs.writeFile para guardar la carta en un archivo
   * @param card card: Card - Carta con los datos actualizados
   * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public updateCard(card: Card, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${card.id}.json`;
    // Comprobar si la carta existe en la colección
    fs.stat(cardFilePath, (err) => {
      if (err) {
        callback(`La carta con ID ${card.id} no existe en la colección de ${this.user}.`);
      } else {
        // Si existe, se actualiza y se guarda en un archivo
        fs.writeFile(cardFilePath, JSON.stringify(card), (err) => {
          if (err) {
            callback(err.message);
          } else {
            callback(undefined);
          }
        });
      }
    });
  }

  /**
  * Método para eliminar una carta de la colección
  * Lo que hace es eliminar el archivo de la carta mediante el ID
  * Si hay un error al eliminar el archivo, se llama al callback con el error correspondiente
  * Utiliza la función fs.unlink para eliminar el archivo
  * @param cardID cardID: number - ID de la carta a eliminar
  * @param callback callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
  */
  public removeCard(cardID: number, callback: (error: string | undefined) => void): void {
    const cardFilePath = `./cards/${this.user}/${cardID}.json`;
    // Comprobar si la carta existe en la colección
    fs.unlink(cardFilePath, (err) => {
      if (err) {
        callback(`Error al eliminar la carta con ID ${cardID} de la colección de ${this.user}: ${err}`);
      } else {
        callback(undefined);
      }
    });
  }

  /**
   * Método para listar las cartas de la colección
   * Lo que hace es leer los archivos de las cartas y devolver la información de cada una
   * Devuelve un string con la información de cada carta, separada por saltos de línea
   * @param callback callback: (error: string | undefined, result?: string) => void - Callback que se llama al finalizar la operación
   */
  public listCards(callback: (error: string | undefined, result?: string) => void): void {
    const directoryPath = `./cards/${this.user}`;
    // Leer los archivos de las cartas
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        callback(`Error al leer el directorio de la colección de ${this.user}: ${err}`);
      } else {
        //SI no hay error, se filtran los archivos con extensión .json
        const cardFiles = files.filter((file) => path.extname(file) === '.json');
        const cardsInfo: string[] = [];
        // Se recorre cada archivo y se añade la información al array cardsInfo
        cardFiles.forEach((file, index) => {
          const cardFilePath = path.join(directoryPath, file);
          const cardInfo = `Carta ${index + 1}: ${cardFilePath}`;
          cardsInfo.push(cardInfo);
        });
        // Se devuelve la información de las cartas
        const result = cardsInfo.join('\n');
        callback(undefined, result);
      }
    });
  }

  /**
   * Método para leer una carta de la colección
   * Lo que hace es leer el archivo de la carta mediante el ID y devolver la información
   * Si hay un error al leer el archivo, se llama al callback con el error correspondiente
   * Si no hay error, se devuelve la información de la carta
   * Utiliza la función fs.readFile para leer el archivo
   * @param cardID cardID: number - ID de la carta a leer
   * @param callback callback: (error: string | undefined, result?: Card) => void - Callback que se llama al finalizar la operación
   */
  public readCard(cardID: number, callback: (error: string | undefined, result?: Card) => void): void {
    const cardFilePath = `./cards/${this.user}/${cardID}.json`;
    // Leer el archivo de la carta
    fs.readFile(cardFilePath, 'utf8', (err, data) => {
      if (err) {
        callback(`Error al leer la carta con ID ${cardID} de la colección de ${this.user}: ${err}`);
      } else {
        try {
          const cardData = JSON.parse(data);
          const card: Card = cardData;
          callback(undefined, card);
        } catch (parseError) {
          callback(`Error al analizar la carta con ID ${cardID} de la colección de ${this.user}: ${parseError}`);
        }
      }
    });
  }

}
