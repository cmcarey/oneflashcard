import Joi from "@hapi/joi";
import { HandledError, RouteHandler } from "./utils";

export class CreateCardTagRoute extends RouteHandler {
  public async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        cardID: Joi.string().required(),
        tagName: Joi.string().required()
      })
    );
    // Require auth
    await this.requireAuth();

    // Check card exists
    const cards = await this.model.getCardsByUserID(this.ctx.userID);
    let belongs = false;
    for (const card of cards) {
      if (card.userID === this.ctx.userID) {
        belongs = true;
        break;
      }
    }
    if (!belongs) throw new HandledError("No such card");

    // Create card tag
    const cardTag = await this.model.createCardTag(
      this.body.cardID,
      this.body.tagName
    );

    // Return card to user
    this.ctx.body = {
      cardTagID: cardTag.cardTagID,
      cardID: cardTag.cardID,
      tagName: cardTag.tagName
    };
  }
}

export class GetCardTagsRoute extends RouteHandler {
  public async handle() {
    // Require auth
    await this.requireAuth();

    // Get card tags
    const cardTags = await this.model.getCardTagsByUserID(this.ctx.userID);

    const sanitizedCardTags = cardTags.map(cardTag => ({
      cardTagID: cardTag.cardTagID,
      cardID: cardTag.cardID,
      tagName: cardTag.tagName
    }));

    // Return cards
    this.ctx.body = { cardTags: sanitizedCardTags };
  }
}
