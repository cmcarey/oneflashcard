import "normalize.css";
import React from "react";
import { cards } from "./cards";
import { ReactComponent as Logo } from "./resources/logo.svg";
import {
  BarButton,
  BarButtons,
  Body,
  BodyBar,
  BodyBarAction,
  BodyTitle,
  Card,
  CardBody,
  Cards,
  CardTag,
  CardTags,
  CardTitle,
  Centered,
  ProfileBox,
  TopBar,
  VertBar
} from "./ui";

export const App = () => {
  const tags: [string, string][] = [
    ["Compilers", "#d4d4ff"],
    ["Memory", "#ffd4da"],
    ["OpenCL", "#fff0d4"],
    ["Cache", "#d4ffdb"],
    ["Hardware", "#d4ddff"]
  ];

  const getTags = () => {
    const rTags = () => Math.floor(Math.random() * tags.length);
    const numTags = rTags();
    const sTags: [string, string][] = [];
    while (sTags.length < numTags) {
      const t = tags[rTags()];
      if (sTags.indexOf(t) < 0) sTags.push(t);
    }
    return sTags.sort();
  };

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
          <BodyBar>
            <BodyTitle>Viewing all cards</BodyTitle>
            <BodyBarAction>Add card</BodyBarAction>
          </BodyBar>
          <Cards>
            {cards.map(card => {
              const ts = getTags();
              return (
                <Card>
                  <CardTitle>{card[0]}</CardTitle>
                  <CardBody>{card[1]}</CardBody>
                  {ts.length > 0 && (
                    <CardTags>
                      {ts.map(t => (
                        <CardTag color={t[1]}>{t[0]}</CardTag>
                      ))}
                    </CardTags>
                  )}
                </Card>
              );
            })}
          </Cards>
        </Centered>
      </Body>
    </div>
  );
};
