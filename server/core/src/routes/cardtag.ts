import Joi from "@hapi/joi";
import { propMatches } from "../db/utils";
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

    // Check card exists and is owned by user
    const cards = await this.model.getCardsByUserID(this.ctx.userID);
    if (!propMatches(cards, "cardID", this.body.cardID))
      throw new HandledError("Invalid cardID");

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

export class DeleteCardTagRoute extends RouteHandler {
  public async handle() {
    // Schema validation
    this.validate(
      Joi.object({
        cardTagID: Joi.string().required()
      })
    );
    // Require auth
    await this.requireAuth();

    // Get card tags
    const cardTags = await this.model.getCardTagsByUserID(this.ctx.userID);
    // Ensure we can delete it
    if (!propMatches(cardTags, "cardTagID", this.body.cardTagID))
      throw new HandledError("Invalid cardTagID");

    // Delete it
    await this.model.deleteCardTag(this.body.cardTagID);
  }
}
