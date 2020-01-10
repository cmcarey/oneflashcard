import "normalize.css";
import React from "react";
import { cards } from "./cards";
import { ReactComponent as Logo } from "./resources/logo.svg";
import {
  BarButton,
  BarButtons,
  Body,
  BodyTitle,
  Card,
  CardBody,
  Cards,
  CardTitle,
  Centered,
  ProfileBox,
  TopBar,
  VertBar
} from "./ui";

export const App = () => {
  return (
    <div>
      <VertBar>
        <Centered>
          <TopBar>
            <Logo width="225px" height="auto" />
            <ProfileBox>
              <div>Chance Carey</div>
              <div>Logout</div>
            </ProfileBox>
          </TopBar>
        </Centered>
      </VertBar>

      <VertBar>
        <Centered>
          <BarButtons>
            <BarButton selected>View cards</BarButton>
            <BarButton>Review</BarButton>
            <BarButton>Learn</BarButton>
          </BarButtons>
        </Centered>
      </VertBar>

      <Body>
        <Centered>
          <BodyTitle>Viewing all cards</BodyTitle>
          <Cards>
            {cards.map(card => (
              <Card>
                <CardTitle>{card[0]}</CardTitle>
                <CardBody>{card[1]}</CardBody>
              </Card>
            ))}
          </Cards>
        </Centered>
      </Body>
    </div>
  );
};
