import express from 'express';
import { CardCollection } from './User.js';
import { JSONtoCard } from './Format_Card.js';

// Crear una nueva colección de cartas
const cardCollection = new CardCollection('nombreDeUsuario');
// Crear una nueva aplicación de Express
const app = express();
// Usar JSON como formato de datos
app.use(express.json());

/**
 * Listar las cartas de un usuario
 * Si se proporciona un ID de carta, se devuelve la información de esa carta.
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al listar las cartas, se devuelve un mensaje de error
 * Si se proporciona un usuario, se devuelve la lista de cartas de ese usuario
 */
app.get('/cards', (req, res) => {
  // Si no se proporciona un usuario, se devuelve un mensaje de error
  if (!req.query.user) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario',
    });
    return;
  }
  // Si se proporciona un ID de carta, se devuelve la información de esa carta
  if (typeof req.query.id === 'string') {
    cardCollection.readCard(parseInt(req.query.id), (error, result) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: result });
      }
    });
  // Si no se proporciona un ID de carta, se devuelve la lista de cartas del usuario
  } else {
    cardCollection.listCards((error, result) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: result });
      }
    });
  }
});

/**
 * Añadir una carta a la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al añadir la carta, se devuelve un mensaje de error
 * Si se añade la carta correctamente, se devuelve un mensaje de éxito
 */
app.post('/cards', (req, res) => {
  // Si no se proporciona un usuario, se devuelve un mensaje de error
  if (!req.query.user) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario',
    });
    return;
  }
  // Se añade la carta a la colección del usuario
  cardCollection.addCard(JSONtoCard(req.body), (error) => {
    if (error) {
      res.status(500).json({ status: 'Error', answer: error });
    } else {
      res.status(200).json({ status: 'Success', answer: 'Card added successfully' });
    }
  });
});

/**
 * Eliminar una carta de la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al eliminar la carta, se devuelve un mensaje de error
 * Si se elimina la carta correctamente, se devuelve un mensaje de éxito
 * Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
 */
app.delete('/cards', (req, res) => {
  // Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
  if (!req.query.user || !req.query.id) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario y un ID de carta',
    });
    return;
  }
  // Se elimina la carta de la colección del usuario
  if (typeof req.query.id === 'string') {
    cardCollection.removeCard(parseInt(req.query.id), (error) => {
      if (error) {
        res.status(500).json({ status: 'Error', answer: error });
      } else {
        res.status(200).json({ status: 'Success', answer: 'Card removed successfully' });
      }
    });
  } else {
    // Si el ID no es un número, se devuelve un mensaje de error
    res.status(400).json({
      status: 'Error',
      answer: 'El ID debe ser un número',
    });
  }
});

/**
 * Actualizar una carta de la colección de un usuario
 * Lo que hace es llamar al método correspondiente de la colección de cartas
 * Si hay un error al actualizar la carta, se devuelve un mensaje de error
 * Si se actualiza la carta correctamente, se devuelve un mensaje de éxito
 */
app.patch('/cards', (req, res) => {
  // Si no se proporciona un usuario o un ID de carta, se devuelve un mensaje de error
  if (!req.query.user || !req.query.id) {
    res.status(400).json({
      status: 'Error',
      answer: 'Se debe proporcionar un usuario y un ID de carta',
    });
    return;
  } 
  // si el ID en el cuerpo no es el mismo que en la cadena de consulta, se devuelve un mensaje de error
  if (typeof req.query.id === 'string' && typeof req.body.id === 'number') {
    if (parseInt(req.query.id) !== req.body.id) {
      res.status(400).json({
        status: 'Error',
        answer: 'El ID en el cuerpo debe ser el mismo que en la cadena de consulta',
      });
      return;
    }
  }
  // Se actualiza la carta de la colección del usuario con los datos proporcionados
  cardCollection.updateCard(JSONtoCard(req.body), (error) => {
    if (error) {
      res.status(500).json({ status: 'Error', answer: error });
    } else {
      res.status(200).json({ status: 'Success', answer: 'Card updated successfully' });
    }
  });
});

/**
 * Iniciar el servidor en el puerto 3000
 * Muestra un mensaje en la consola para indicar que el servidor está en funcionamiento
 * Si hay un error al iniciar el servidor, se muestra un mensaje en la consola
 */
app.listen(3000, () => {
  console.log('El servidor está en funcionamiento en el puerto 3000');
});
