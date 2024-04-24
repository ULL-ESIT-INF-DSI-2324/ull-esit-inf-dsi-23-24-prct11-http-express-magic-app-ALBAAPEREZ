import { Document, Schema, model } from 'mongoose';

/**
 * Enumeración de colores
 * Se utiliza para definir los colores de las cartas
 */
enum Color {
  Blue = 'Blue',
  Green = 'Green',
  Red = 'Red',
  Yellow = 'Yellow',
  Magenta = 'Magenta'
}

/**
 * Enumeración de tipos de cartas
 * Se utiliza para definir los tipos de cartas
 */
enum LineType {
  Creature = 'Creature',
  Sorcery = 'Sorcery',
  Instant = 'Instant',
  Enchantment = 'Enchantment',
  Artifact = 'Artifact',
  Planeswalker = 'Planeswalker'
}

/**
 * Enumeración de rareza
 * Se utiliza para definir la rareza de las cartas
 */
enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Mythic = 'Mythic'
}

/**
 * Interfaz para la información de las cartas
 * Esta interfaz se utiliza para definir la estructura de los datos que se van a utilizar en la aplicación
 * @param name: string - Nombre de la carta
 * @param manaCost: number - Costo de mana de la carta
 * @param color: string - Color de la carta
 * @param cardType: string - Tipo de carta
 * @param rarity: Rarity, es una enumeracion
 * @param rulesText: string - Texto de reglas de la carta
 * @param power: number - Poder de la carta
 * @param toughness: number - Resistencia de la carta
 * @param loyalty: number - Lealtad de la carta
 * @param marketValue: number - Valor de mercado de la carta
 */
interface CardDocumentInterface extends Document {
  id: number;
  name: string;
  manaCost: number;
  color: Color[];
  cardType: LineType;
  rarity: Rarity;
  rulesText: string;
  power?: number; 
  toughness?: number; 
  loyalty?: number; 
  marketValue: number;
}

/**
 * Esquema de la carta.
 * Lo que se hace es definir la estructura de la carta, es decir, los campos que va a tener la carta
 * y el tipo de dato que va a tener cada campo.
 */
const CardSchema = new Schema<CardDocumentInterface>({
  id: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  /**
   * Nombre de la carta
   * Es un campo de tipo String, único, requerido y se le aplica un trim 
   * para eliminar los espacios en blanco.
   */
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Card name must start with a capital letter');
      }
    },
  },

  /**
   * Costo de mana de la carta
   * Es un campo de tipo Number, requerido y se le aplica un trim 
   * para eliminar los espacios en blanco.
   */
  manaCost: {
    type: Number,
    required: true,
    trim: true,
  },

  /**
   * Color de la carta
   * Es un campo de tipo String, requerido y se le aplica un enum
   * para definir los valores que puede tener.
   */
  color: {
    type: [String],
    required: true,
    enum: Object.values(Color) 
  },

  /**
   * Tipo de carta
   * Es un campo de tipo String, requerido y se le aplica un enum
   * para definir los valores que puede tener.
   */
  cardType: {
    type: String, 
    required: true,
    enum: Object.values(LineType) 
  },

  /**
   * Rareza de la carta
   * Es un campo de tipo String, requerido y se le aplica un enum
   * para definir los valores que puede tener.
   */
  rarity: {
    type: String,
    required: true,
    trim: true,
    enum: Object.values(Rarity)
  },

  /**
   * Texto de reglas de la carta
   * Es un campo de tipo String, requerido y se le aplica un trim 
   * para eliminar los espacios en blanco.
   */
  rulesText: {
    type: String, 
    required: true,
    trim: true,
  },

  /**
   * Poder de la carta
   * Es un campo de tipo Number, no requerido.
   * Solo se incluyen en aquellas cartas de tipo Criatura
   */
  power: {
    type: Number, 
    required: false, 
  },

  /**
   * Resistencia de la carta
   * Es un campo de tipo Number, no requerido.
   * Solo se incluyen en aquellas cartas de tipo Criatura
   */
  toughness: {
    type: Number, 
    required: false, 
  },

  /**
   * Lealtad de la carta
   * Es un campo de tipo Number, no requerido.
   * Solo Planeswalker
   */
  loyalty: {
    type: Number, 
    required: false, 
  },

  /**
   * Valor de mercado de la carta
   * Es un campo de tipo Number, requerido.
   */
  marketValue: {
    type: Number, 
    required: true,
  }
});

export const Card = model<CardDocumentInterface>('Card', CardSchema);
