import Joi from "joi";
import { RouteError, RouteHandler } from "../utils/route";

export const cardFetchFoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    const cards = await ctx.db.getCardsByUserID(koaCtx.userID);

    koaCtx.body = {
      cards: cards.map(card => ({
        cardID: card.card_id,
        title: card.title,
        text: card.text,
        tagIDs: card.tag_ids
      }))
    };
  }
};

export const cardCreateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    tagIDs: Joi.array()
      .items(Joi.string())
      .required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Validate that all tagIDs match
    const allUserTags = await ctx.db.getTagsByUserID(koaCtx.userID);
    const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
    for (const tagID of body.tagIDs) {
      if (!allUserTagIDs.includes(tagID)) throw new RouteError("BAD_TAGID");
    }

    // Create card
    const card = await ctx.db.createCard(
      koaCtx.userID,
      body.title,
      body.text,
      body.tagIDs
    );

    koaCtx.body = {
      card: {
        cardID: card.card_id,
        title: card.title,
        text: card.text,
        tagIDs: card.tag_ids
      }
    };
  }
};

export const cardUpdateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    card: Joi.object({
      cardID: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      tagIDs: Joi.array()
        .items(Joi.string())
        .required()
    }).required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this card
    const allUserCards = await ctx.db.getCardsByUserID(koaCtx.userID);
    const allUserCardIDs = allUserCards.map(card => card.card_id);
    if (!allUserCardIDs.includes(body.card.cardID))
      throw new RouteError("BAD_CARDID");

    // Validate that all tagIDs match
    const allUserTags = await ctx.db.getTagsByUserID(koaCtx.userID);
    const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
    for (const tagID of body.card.tagIDs) {
      if (!allUserTagIDs.includes(tagID)) throw new RouteError("BAD_TAGID");
    }

    // Update
    await ctx.db.updateCard({
      card_id: body.card.cardID,
      user_id: koaCtx.userID,
      title: body.card.title,
      text: body.card.text,
      tag_ids: body.card.tagIDs
    });
  }
};

export const cardDeleteRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    cardID: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this card
    const allUserCards = await ctx.db.getCardsByUserID(koaCtx.userID);
    const allUserCardIDs = allUserCards.map(card => card.card_id);
    if (!allUserCardIDs.includes(body.cardID))
      throw new RouteError("BAD_CARDID");

    await ctx.db.deleteCard(body.cardID);
  }
};
