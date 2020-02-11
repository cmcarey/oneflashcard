"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const route_1 = require("../utils/route");
exports.tagFetchRoute = {
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
exports.tagCreateRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        text: joi_1.default.string().required(),
        color: joi_1.default.string().required()
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
exports.tagUpdateRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        tag: joi_1.default.object({
            tag_id: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
            color: joi_1.default.string().required()
        }).required()
    }),
    handle: async (ctx, koaCtx) => {
        const body = koaCtx.request.body;
        // Check that user owns this tag
        const alluserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
        const allUserTagIDs = alluserTags.map(tag => tag.tag_id);
        if (!allUserTagIDs.includes(body.tag.tag_id))
            throw new route_1.RouteError("BAD_TAGID");
        // Update
        await ctx.db.updateTag({
            tag_id: body.tag.tag_id,
            user_id: koaCtx.user_id,
            text: body.tag.text,
            color: body.tag.color
        });
    }
};
exports.tagDeleteRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        tag_id: joi_1.default.string().required()
    }),
    handle: async (ctx, koaCtx) => {
        const body = koaCtx.request.body;
        // Check that user owns this tag
        const alluserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
        const allUserTagIDs = alluserTags.map(tag => tag.tag_id);
        if (!allUserTagIDs.includes(body.tag_id))
            throw new route_1.RouteError("BAD_TAGID");
        await ctx.db.deleteTag(body.tag_id);
    }
};
