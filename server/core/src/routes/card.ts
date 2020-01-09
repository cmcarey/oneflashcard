import Joi from "@hapi/joi";
import { RouteHandler } from "./utils";

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
    // Require authentication
    await this.requireAuth();

    // Get cards
    const cards = await this.model.getCardsByUserID(this.ctx.userID);

    // Return cards
    this.ctx.body = cards.map(card => ({
      cardID: card.cardID,
      cardTitle: card.cardTitle,
      cardBody: card.cardBody
    }));
  }
}
