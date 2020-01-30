import Joi from "joi";
import { RouteError, RouteHandler } from "../utils/route";

export const tagFetchRoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    const tags = await ctx.db.getTagsByUserID(koaCtx.userID);

    koaCtx.body = {
      tags: tags.map(tag => ({
        tagID: tag.tagID,
        text: tag.text,
        color: tag.color
      }))
    };
  }
};

export const tagCreateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    text: Joi.string().required(),
    color: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Create tag
    const tag = await ctx.db.createTag(koaCtx.userID, body.text, body.color);

    koaCtx.body = {
      tag: {
        tagID: tag.tagID,
        text: tag.text,
        color: tag.color
      }
    };
  }
};

export const tagUpdateRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    tag: Joi.object({
      tagID: Joi.string().required(),
      text: Joi.string().required(),
      color: Joi.string().required()
    }).required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this tag
    const alluserTags = await ctx.db.getTagsByUserID(koaCtx.userID);
    const allUserTagIDs = alluserTags.map(tag => tag.tagID);
    if (!allUserTagIDs.includes(body.tag.tagID))
      throw new RouteError("BAD_TAGID");

    // Update
    await ctx.db.updateTag({
      tagID: body.tag.tagID,
      userID: koaCtx.userID,
      text: body.tag.text,
      color: body.tag.color
    });
  }
};

export const tagDeleteRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    tagID: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this tag
    const alluserTags = await ctx.db.getTagsByUserID(koaCtx.userID);
    const allUserTagIDs = alluserTags.map(tag => tag.tagID);
    if (!allUserTagIDs.includes(body.tagID)) throw new RouteError("BAD_TAGID");

    await ctx.db.deleteTag(body.tagID);
  }
};
