import React from "react";
import {
  Card,
  CardBody,
  CardGrid,
  CardTag,
  CardTags,
  CardTitle,
  Container,
  Sidebar,
  SidebarButton,
  SidebarLabel
} from "./ui";

const cards: [string, string, string[]][] = [
  [
    "Compiler blocking",
    "Subdivide matrices into blocks, more memory access but improves spatial locality",
    ["CS4202", "Compiler"]
  ],
  ["Compiler prefetch", "Compiler inserts prefetch instructions", []],
  ["Cycle time", "Time between starting memory accesses", []],
  ["Compulsory misses", "First time a block is used (first reference)", []]
];

export default () => (
  <Container>
    <Sidebar>
      <SidebarLabel big>oneflashcard</SidebarLabel>
      <SidebarButton selected>Home</SidebarButton>
      <SidebarButton>About</SidebarButton>

      <SidebarLabel>Flashcards</SidebarLabel>
      <SidebarButton>New</SidebarButton>
      <SidebarButton>Manage</SidebarButton>
      <SidebarButton>Learn</SidebarButton>
      <SidebarButton>Review</SidebarButton>
    </Sidebar>
    <CardGrid>
      {cards.map((c, i) => (
        <Card key={i}>
          <CardTitle>{c[0]}</CardTitle>
          <CardBody>{c[1]}</CardBody>
          {c[2].length > 0 && (
            <CardTags>
              {c[2].map((t, i) => (
                <CardTag key={i}>{t}</CardTag>
              ))}
            </CardTags>
          )}
        </Card>
      ))}
    </CardGrid>
  </Container>
);
