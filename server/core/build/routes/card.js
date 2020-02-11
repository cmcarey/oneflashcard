"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const route_1 = require("../utils/route");
exports.cardFetchFoute = {
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
exports.cardCreateRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        title: joi_1.default.string().required(),
        text: joi_1.default.string().required(),
        tag_ids: joi_1.default.array()
            .items(joi_1.default.string())
            .required()
    }),
    handle: async (ctx, koaCtx) => {
        const body = koaCtx.request.body;
        // Validate that all tagIDs match
        const allUserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
        const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
        for (const tagID of body.tag_ids) {
            if (!allUserTagIDs.includes(tagID))
                throw new route_1.RouteError("BAD_TAGID");
        }
        // Create card
        const card = await ctx.db.createCard(koaCtx.user_id, body.title, body.text, body.tag_ids);
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
exports.cardUpdateRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        card: joi_1.default.object({
            card_id: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            text: joi_1.default.string().required(),
            tag_ids: joi_1.default.array()
                .items(joi_1.default.string())
                .required()
        }).required()
    }),
    handle: async (ctx, koaCtx) => {
        const body = koaCtx.request.body;
        // Check that user owns this card
        const allUserCards = await ctx.db.getCardsByUserID(koaCtx.user_id);
        const allUserCardIDs = allUserCards.map(card => card.card_id);
        if (!allUserCardIDs.includes(body.card.card_id))
            throw new route_1.RouteError("BAD_CARDID");
        // Validate that all tagIDs match
        const allUserTags = await ctx.db.getTagsByUserID(koaCtx.user_id);
        const allUserTagIDs = allUserTags.map(tag => tag.tag_id);
        for (const tagID of body.card.tag_ids) {
            if (!allUserTagIDs.includes(tagID))
                throw new route_1.RouteError("BAD_TAGID");
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
exports.cardDeleteRoute = {
    requireAuth: true,
    validation: joi_1.default.object({
        card_id: joi_1.default.string().required()
    }),
    handle: async (ctx, koaCtx) => {
        const body = koaCtx.request.body;
        // Check that user owns this card
        const allUserCards = await ctx.db.getCardsByUserID(koaCtx.user_id);
        const allUserCardIDs = allUserCards.map(card => card.card_id);
        if (!allUserCardIDs.includes(body.card_id))
            throw new route_1.RouteError("BAD_CARDID");
        await ctx.db.deleteCard(body.card_id);
    }
};
