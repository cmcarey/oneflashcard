import React from "react";
import styled from "styled-components";
import { SBox, SBoxBody, SBoxTitle } from "../../../SharedStyles";
import { Card, Tag } from "../../../Store/Model";

export const Cards = ({
  cards,
  tags,
  editCard
}: {
  cards: Card[];
  tags: Tag[];
  editCard: (card: Card) => void;
}) => {
  const allTagIDs = tags.map(tag => tag.tagID);

  const tagsOfCard = (card: Card): Tag[] =>
    card.tagIDs.map(tagID => tags[allTagIDs.indexOf(tagID)]);

  return (
    <SContainer>
      {cards.map(card => (
        <SBoxHover key={card.cardID} onClick={() => editCard(card)}>
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
        </SBoxHover>
      ))}
    </SContainer>
  );
};

const SBoxHover = styled(SBox)`
  :hover {
    box-shadow: 0 1px 2px 3px #e8e8e8;
  }

  cursor: pointer;
  transition: 0.1s box-shadow;
`;

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
