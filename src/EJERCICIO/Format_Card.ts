import { Card } from "./Card.js";

/**
 * Función para convertir un objeto JSON a una carta
 * Lo que hace es crear una nueva carta con los datos del objeto JSON
 * @param card card: any - Objeto JSON con los datos de la carta
 * @returns Card - Carta creada a partir del objeto JSON
 */
export function JSONtoCard(card: any): Card {
  const CardCollection: Card = {
    id: card.id,
    name: card.name,
    manaCost: card.manaCost,
    color: card.color,
    cardType: card.cardType,
    rarity: card.rarity,
    rulesText: card.rulesText,
    marketValue: card.marketValue,
    power: card.power,
    toughness: card.toughness,
    loyalty: card.loyalty,
  };
  return CardCollection;
}