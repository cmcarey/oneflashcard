import Joi from "@hapi/joi";
import { propMatches } from "../db/utils";
import { HandledError, RouteHandler } from "./utils";

export class CreateCardRoute extends RouteHandler {
  public async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        cardTitle: Joi.string().required(),
        cardBody: Joi.string().required()
      })
    );
    // Require auth
    await this.requireAuth();

    // Create card
    const card = await this.model.createCard(
      this.ctx.userID,
      this.body.cardTitle,
      this.body.cardBody
    );

    // Return card to user
    this.ctx.body = {
      cardID: card.cardID,
      cardTitle: card.cardTitle,
      cardBody: card.cardBody
    };
  }
}

export class GetCardsRoute extends RouteHandler {
  public async handle() {
    // Require auth
    await this.requireAuth();

    // Get cards
    const cards = await this.model.getCardsByUserID(this.ctx.userID);

    const sanitizedCards = cards.map(card => ({
      cardID: card.cardID,
      cardTitle: card.cardTitle,
      cardBody: card.cardBody
    }));

    // Return cards
    this.ctx.body = { cards: sanitizedCards };
  }
}

export class UpdateCardsRoute extends RouteHandler {
  public async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        cardID: Joi.string().required(),
        cardTitle: Joi.string(),
        cardBody: Joi.string()
      })
    );
    // Require auth
    await this.requireAuth();

    // Check we own this card
    const cards = await this.model.getCardsByUserID(this.ctx.userID);
    if (!propMatches(cards, "cardID", this.body.cardID))
      throw new HandledError("Invalid cardID");

    // If we do, update and return
    const card = await this.model.updateCard(
      this.body.cardID,
      this.body.cardTitle,
      this.body.cardBody
    );

    this.ctx.body = {
      cardID: card.cardID,
      cardTitle: card.cardTitle,
      cardBody: card.cardBody
    };
  }
}
