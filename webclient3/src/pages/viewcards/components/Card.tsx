import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { LinkedCard } from "../../../interface/model";

type Props = { card: LinkedCard };

export default observer((props: Props) => (
  <SBox>
    <b>{props.card.title}</b>
    <p>{props.card.text}</p>
    {props.card.tags.length > 0 && (
      <SCardTags>
        {props.card.tags.map(tag => (
          <SCardTag key={tag.tagID} color={tag.color}>
            {tag.text}
          </SCardTag>
        ))}
      </SCardTags>
    )}
  </SBox>
));

const SBox = styled.div.attrs({ className: "box" })`
  margin-bottom: 0 !important;
  max-width: 400px;
`;

const SCardTags = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.3rem;
  justify-content: start;
  margin-top: 0.5rem;
`;

const SCardTag = styled.div<{ color: string }>`
  font-size: 0.7rem;
  padding: 0 0.3rem;
  border-radius: 0.3rem;
  color: black;
  background: ${p => p.color};
`;
