import React from "react";
import styled from "styled-components";
import { SBox, SBoxBody, SBoxTitle } from "../../../SharedStyles";
import { Card, Tag } from "../../../Store/Model";

export const Cards = ({ cards, tags }: { cards: Card[]; tags: Tag[] }) => {
  const allTagIDs = tags.map(tag => tag.tagID);

  const tagsOfCard = (card: Card): Tag[] =>
    card.tagIDs.map(tagID => tags[allTagIDs.indexOf(tagID)]);

  return (
    <SContainer>
      {cards.map(card => (
        <SBox key={card.cardID}>
          <SBoxTitle>{card.title}</SBoxTitle>
          <SBoxBody>{card.text}</SBoxBody>
          {card.tagIDs.length > 0 && (
            <STags>
              {tagsOfCard(card).map(tag => (
                <STag key={tag.tagID} color={tag.color}>
                  {tag.name}
                </STag>
              ))}
            </STags>
          )}
        </SBox>
      ))}
    </SContainer>
  );
};

const SContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const STags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
  padding-top: 0.5rem;

  font-size: 0.7rem;
`;

const STag = styled.div<{ color: string }>`
  padding: 0.2rem 0.5rem;

  background: ${p => p.color};
  border-radius: 0.2rem;
`;
