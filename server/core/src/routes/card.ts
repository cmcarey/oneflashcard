import Joi from "joi";
import { RouteError, RouteHandler } from "../utils/route";

export const cardFetchFoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    const cards = await ctx.db.getCardsByUserID(koaCtx.user_id);

    koaCtx.body = {
      cards: cards.map(card => ({
        card_id: card.card_id,
        title: card.title,
        text: card.text,
        tag_ids: card.tag_ids
      }))
    };
  }
};

export const cardCreateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    tag_ids: Joi.array()
      .items(Joi.string())
      .required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Validate that all tagIDs match
    const allUserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
    const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
    for (const tagID of body.tag_ids) {
      if (!allUserTagIDs.includes(tagID)) throw new RouteError("BAD_TAGID");
    }

    // Create card
    const card = await ctx.db.createCard(
      koaCtx.user_id,
      body.title,
      body.text,
      body.tag_ids
    );

    koaCtx.body = {
      card: {
        card_id: card.card_id,
        title: card.title,
        text: card.text,
        tag_ids: card.tag_ids
      }
    };
  }
};

export const cardUpdateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    card: Joi.object({
      card_id: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      tag_ids: Joi.array()
        .items(Joi.string())
        .required()
    }).required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this card
    const allUserCards = await ctx.db.getCardsByUserID(koaCtx.user_id);
    const allUserCardIDs = allUserCards.map(card => card.card_id);
    if (!allUserCardIDs.includes(body.card.card_id))
      throw new RouteError("BAD_CARDID");

    // Validate that all tagIDs match
    const allUserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
    const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
    for (const tagID of body.card.tag_ids) {
      if (!allUserTagIDs.includes(tagID)) throw new RouteError("BAD_TAGID");
    }

    // Update
    await ctx.db.updateCard({
      card_id: body.card.card_id,
      user_id: koaCtx.user_id,
      title: body.card.title,
      text: body.card.text,
      tag_ids: body.card.tag_ids
    });
  }
};

export const cardDeleteRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    card_id: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this card
    const allUserCards = await ctx.db.getCardsByUserID(koaCtx.user_id);
    const allUserCardIDs = allUserCards.map(card => card.card_id);
    if (!allUserCardIDs.includes(body.card_id))
      throw new RouteError("BAD_CARDID");

    await ctx.db.deleteCard(body.card_id);
  }
};
