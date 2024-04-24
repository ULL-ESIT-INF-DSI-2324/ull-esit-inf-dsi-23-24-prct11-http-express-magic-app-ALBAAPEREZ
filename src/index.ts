import express from 'express';
import './DB/mongoose.js';
import { Card } from './models/Card.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Crear una carta nueva,
 * Se espera recibir un objeto JSON con la siguiente estructura:
 * {
 *  "name": "string",
 * "manaCost": "number",
 * "color": "string",
 * "cardType": "string",
 * "rarity": "string",
 * "rulesText": "string",
 * "power": "number",
 * "toughness": "number",
 * "loyalty": "number",
 * "marketValue": "number"
 * }
 */
app.post('/cards', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Esto se encarga de obtener todas las cartas que se encuentran en la base de datos
 * Se espera recibir un objeto JSON con la estructura de la carta
 */
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send();
  }
});

/**
 * Lo que se hace es obtener una carta por su ID
 * Se espera recibir un objeto JSON con la estructura de la carta
 */
// Obtener una carta por su ID
app.get('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findOne({ id: req.params.id });
    if (!card) {
      return res.status(404).send('Card not found');
    }
    return res.send(card);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * Actualizar una carta por su ID
 * Se espera recibir un objeto JSON con la estructura de la carta
 */
app.patch('/cards/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name', 'manaCost', 'color', 'cardType', 'rarity', 'rulesText', 'power', 'toughness', 'loyalty', 'marketValue'
  ];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  // si no es una operación válida
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const card = await Card.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!card) {
      return res.status(404).send('Card not found');
    }
    return res.send(card);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Eliminar una carta por su ID
 * Se espera recibir un objeto JSON con la estructura de la carta
 */
app.delete('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ id: req.params.id });
    if (!card) {
      return res.status(404).send('Card not found');
    }
    return res.send(card);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * Iniciar el servidor en el puerto 3000
 */
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
