import fs from 'fs';
import { Card } from './Card.js';
import * as path from 'path';

/**
 * Clase para la gestión de archivos
 * Esta clase se utiliza para la gestión de archivos de las cartas de un usuario
 * Cada usuario tiene su propio directorio con los archivos de sus cartas
 * @param userDir: string - Directorio del usuario
 * @param username: string - Nombre de usuario
 * @param getUserDir: void - Obtener el directorio del usuario
 * @param getFilePath: void - Obtener la ruta de un archivo
 * @param save: void - Guardar la colección de cartas en archivos
 * @param writeFiles: void - Escribir los archivos de las cartas
 * @param load: void - Cargar la colección de cartas desde archivos
 */
export class FileManager {
  private readonly userDir: string;

  /**
   * Constructor de la clase FileManager
   * Se encarga de inicializar el nombre de usuario y el directorio del usuario
   * @param username username: string - Nombre de usuario
   * @returns void no retorna nada
   */
  constructor(private username: string) {
    this.userDir = `./src/EJERCICIO/users/${username}`;
  }
  
  /**
   * método para obtener el directorio del usuario
   * Lo que hace es llamar al callback con el directorio del usuario
   * @param callback parámetro callback: (error: string | undefined, userDir?: string) => void - Callback que se llama al finalizar la operación
   */
  public getUserDir(callback: (error: string | undefined, userDir?: string) => void): void {
    process.nextTick(() => {
      callback(undefined, this.userDir);
    });
  }

  /**
   * Método para obtener la ruta de un archivo
   * Lo que hace es llamar al callback con la ruta del archivo
   * @param cardId cardId: number - ID de la cart 
   * @param callback parámetro callback: (error: string | undefined, filePath?: string) => void - Callback que se llama al finalizar la operación
   */
  public getFilePath(cardId: number, callback: (error: string | undefined, filePath?: string) => void): void {
    const filePath = path.join(this.userDir, `card${cardId}.json`);
    process.nextTick(() => {
      callback(undefined, filePath);
    });
  }

  /**
   * Método para guardar la colección de cartas en archivos
   * Lo que hace es crear el directorio del usuario y llamar al método para escribir los archivos
   * Si hay un error al crear el directorio, se llama al callback con el error correspondiente
   * @param collection collection: Map<number, Card> - Colección de cartas
   * @param callback parámetro callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  public save(collection: Map<number, Card>, callback: (error: string | undefined) => void): void {
    // se crea el directorio del usuario y se llama al método para escribir los archivos
    const mkdirCallback = (err: NodeJS.ErrnoException | null) => {
      if (err) {
        callback(err.message);
      } else {
        this.writeFiles(collection, callback);
      }
    };
    fs.mkdir(this.userDir, { recursive: true }, mkdirCallback);
  }

  /**
   * Método para escribir los archivos de las cartas
   * Lo que hace es recorrer la colección de cartas y escribir los archivos
   * Si hay un error al escribir un archivo, se llama al callback con el error correspondiente
   * @param collection collection: Map<number, Card> - Colección de cartas
   * @param callback parámetro callback: (error: string | undefined) => void - Callback que se llama al finalizar la operación
   */
  private writeFiles(collection: Map<number, Card>, callback: (error: string | undefined) => void): void {
    const fileWriteCallbacks: Function[] = [];
    collection.forEach((card, cardId) => {
      const filePath = path.join(this.userDir, `card${cardId}.json`);
      // se define el callback para escribir el archivo de la carta
      const writeFileCallback = (err: NodeJS.ErrnoException | null) => {
        // si hay un error al escribir el archivo, se llama al callback con el error
        if (err) {
          callback(err.message);
        } else if (fileWriteCallbacks.length === collection.size) {
          callback(undefined);
        }
      };
      fileWriteCallbacks.push(writeFileCallback);
      fs.writeFile(filePath, JSON.stringify(card, null, 2), writeFileCallback);
    });
  }
  
  /**
   * método para cargar la colección de cartas desde archivos
   * Lo que hace es leer los archivos JSON de las cartas y guardar las cartas en la colección
   * Si hay un error al leer los archivos, se llama al callback con el error correspondiente
   * @param callback parámetro callback: (error: string | undefined, collection?: Map<number, Card>) => void - Callback que se llama al finalizar la operación
   * @returns void no retorna nada
   */
  public load(callback: (error: string | undefined, collection?: Map<number, Card>) => void): void {
    const collection = new Map<number, Card>();
    // se lee el directorio del usuario y se llama al callback con el error o la colección de cartas
    fs.readdir(this.userDir, (err, files) => {
      if (err) {
        callback(err.message);
      } else {
        const fileReadCallbacks: Function[] = [];
        files.forEach((file) => {
          const filePath = path.join(this.userDir, file);
          // se define el callback para leer el archivo de la carta
          const readFileCallback = (err: NodeJS.ErrnoException | null, data: Buffer) => {
            if (err) {
              callback(err.message);
            } else {
              // se lee el archivo JSON de la carta y se guarda la carta en la colección
              try {
                const card = JSON.parse(data.toString()) as Card;
                collection.set(card.id, card);
                if (fileReadCallbacks.length === files.length) {
                  callback(undefined, collection);
                }
              } catch (error) {
                callback(`Error al leer el archivo ${file}: ${error.message}`);
              }
            }
          };
          fileReadCallbacks.push(readFileCallback);
          fs.readFile(filePath, readFileCallback);
        });
      }
    });
  }
}
