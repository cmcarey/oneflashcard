import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  font-size: 14px;
  font-family: Arial, Verdana, sans-serif;
  color: #575757;
}
`;

export const Page = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: [topbar] 50px [main] 1fr;
`;

export const Topbar = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
  padding-left: 1rem;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: [sidebar] 200px [content] 3fr [details] 1fr;
  min-height: 0;
`;

export const Bar = styled.div`
  background: #f2f2f2;
  padding-top: 1rem;
`;

export const BarLabel = styled.div`
  padding: 0.5rem 1rem;
  color: black;
  font-weight: bold;

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

export const BarLink = styled.a<{ selected?: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.1s background;

  ${p =>
    p.selected
      ? `
    background: #ffb3b3;
    color: black;
  `
      : `
    &:hover {
      background: #dfdfdf;
    }

    &:active {
      background: white;
    }
  `}
`;

export const Content = styled.div`
  overflow: scroll;
`;

export const Card = styled.div<{ selected?: boolean }>`
  padding: 1rem;
  display: grid;
  grid-gap: 0.5rem;

  ${p =>
    p.selected &&
    `
    background: #f2f2f2;
  `}
`;

export const CardTags = styled.div``;

export const CardTag = styled.div`
  display: inline-block;
  background: #ffb3b3;
  color: black;
  padding: 0.3rem;
  border-radius: 0.3rem;

  :not(:first-child) {
    margin-left: 1rem;
  }
`;

export const CardTitle = styled.div`
  font-weight: bold;
`;

export const CardBody = styled.div``;

export const DetailBar = styled.div`
  background: #7e7e7e;
`;
