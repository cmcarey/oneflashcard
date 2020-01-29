import Joi from "joi";
import { RouteError, RouteHandler } from "../utils/route";

export const cardFetchFoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    const cards = await ctx.db.getCardsByUserID(koaCtx.userID);

    koaCtx.body = {
      cards: cards.map(card => ({
        cardID: card.cardID,
        title: card.title,
        text: card.text,
        tagIDs: card.tagIDs
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
    const allUserTagIDs = allUserTags.map(tag => tag.tagID);
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
        cardID: card.cardID,
        title: card.title,
        text: card.text,
        tagIDs: card.tagIDs
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
    const allUserCardIDs = allUserCards.map(card => card.cardID);
    if (!allUserCardIDs.includes(body.card.cardID))
      throw new RouteError("BAD_CARDID");

    // Validate that all tagIDs match
    const allUserTags = await ctx.db.getTagsByUserID(koaCtx.userID);
    const allUserTagIDs = allUserTags.map(tag => tag.tagID);
    for (const tagID of body.card.tagIDs) {
      if (!allUserTagIDs.includes(tagID)) throw new RouteError("BAD_TAGID");
    }

    // Update
    await ctx.db.updateCard({
      cardID: body.card.cardID,
      userID: koaCtx.userID,
      title: body.card.title,
      text: body.card.text,
      tagIDs: body.card.tagIDs
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
    const allUserCardIDs = allUserCards.map(card => card.cardID);
    if (!allUserCardIDs.includes(body.cardID))
      throw new RouteError("BAD_CARDID");

    await ctx.db.deleteCard(body.cardID);
  }
};
