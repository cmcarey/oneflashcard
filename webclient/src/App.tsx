import React from "react";
import { cards } from "./cards";
import {
  Bar,
  BarLabel,
  BarLink,
  Card,
  CardBody,
  CardTag,
  CardTags,
  CardTitle,
  Container,
  Content,
  DetailBar,
  Page,
  Topbar
} from "./ui";

export default () => (
  <Page>
    <Topbar>oneflashcard</Topbar>

    <Container>
      <Bar>
        <BarLabel>Flashcards</BarLabel>
        <BarLink selected>View all</BarLink>
        <BarLink>Learn</BarLink>

        <BarLabel>Account</BarLabel>
        <BarLink>Manage</BarLink>
        <BarLink>Logout</BarLink>
      </Bar>

      <Content>
        {true &&
          cards.map(c => (
            <Card>
              <CardTags>
                <CardTag>CS4202</CardTag>
                <CardTag>Compiler</CardTag>
              </CardTags>
              <CardTitle>{c[0]}</CardTitle>
              <CardBody>{c[1]}</CardBody>
            </Card>
          ))}
      </Content>

      <DetailBar>detail</DetailBar>
    </Container>
  </Page>
);
