import Joi from "joi";
import { RouteError, RouteHandler } from "../utils/route";

export const tagFetchRoute: RouteHandler = {
  requireAuth: true,
  validation: undefined,

  handle: async (ctx, koaCtx) => {
    const tags = await ctx.db.getTagsByUserID(koaCtx.user_id);

    koaCtx.body = {
      tags: tags.map(tag => ({
        tag_id: tag.tag_id,
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
    const tag = await ctx.db.createTag(koaCtx.user_id, body.text, body.color);

    koaCtx.body = {
      tag: {
        tag_id: tag.tag_id,
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
      tag_id: Joi.string().required(),
      text: Joi.string().required(),
      color: Joi.string().required()
    }).required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this tag
    const alluserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
    const allUserTagIDs = alluserTags.map(tag => tag.tag_id);
    if (!allUserTagIDs.includes(body.tag.tag_id))
      throw new RouteError("BAD_TAGID");

    // Update
    await ctx.db.updateTag({
      tag_id: body.tag.tag_id,
      user_id: koaCtx.user_id,
      text: body.tag.text,
      color: body.tag.color
    });
  }
};

export const tagDeleteRoute: RouteHandler = {
  requireAuth: true,
  validation: Joi.object({
    tag_id: Joi.string().required()
  }),

  handle: async (ctx, koaCtx) => {
    const body = koaCtx.request.body;

    // Check that user owns this tag
    const alluserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
    const allUserTagIDs = alluserTags.map(tag => tag.tag_id);
    if (!allUserTagIDs.includes(body.tag_id)) throw new RouteError("BAD_TAGID");

    await ctx.db.deleteTag(body.tag_id);
  }
};
