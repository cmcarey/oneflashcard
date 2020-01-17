import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Prof } from "../../../assets/prof.svg";
import Body from "../../../shared/components/Body";

export default observer(() => (
  <Body>
    <SHero>
      <SText>
        <h1>Flashcards, improved</h1>
        <p>
          <b>oneflashcard</b> allows you to organize your flashcard items by
          tags rather than just by sets.
        </p>
        <p>Sort, filter, and learn your flashcards in intelligent ways.</p>
      </SText>
      <SImage>
        <Prof width={undefined} height={undefined} />
      </SImage>
    </SHero>
  </Body>
));

const SHero = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  font-size: 1.3rem;
`;

const SText = styled.div``;

const SImage = styled.div``;
