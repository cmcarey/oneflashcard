import styled, { createGlobalStyle } from "styled-components";

// =============
// =============
// Global design
// -------------

export const GlobalStyle = createGlobalStyle`
body {
  background: #f6f7fc;
  font-family: "Source Sans Pro", sans-serif;
  padding-bottom: 0.5rem;
}
`;

// =======================
// =======================
// Generic design elements
// -----------------------

export const VertBar = styled.div`
  background: white;
  border-bottom: 1px solid #ddd;
  color: #888;
`;

export const Centered = styled.div`
  margin: 0 auto;
  max-width: 1400px;
`;

export const ProfileBox = styled.div`
  > *:first-child {
    color: black;
  }

  text-align: right;
`;

export const BarButtons = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0 0.5rem;
`;

export const BarButton = styled.div<{ selected?: boolean }>`
  :not(:first-child) {
    margin-left: 2rem;
  }

  :hover {
    color: #444;
    border-bottom-color: #444;
  }

  padding: 0.7rem 0;
  border-bottom: 1px solid transparent;
  transition: 0.2s border-bottom-color;
  cursor: pointer;

  ${p =>
    p.selected &&
    `
    color: #5050ff;
    border-bottom-color: #5050ff;
  `}
`;

export const Body = styled.div`
  margin-top: 2rem;

  padding: 0 0.5rem;
`;

export const BodyTitle = styled.div`
  margin-bottom: 1rem;

  font-size: 1.5rem;
  color: #888;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

export const Card = styled.div`
  padding: 0.5rem;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px #e8e8e8;
`;

export const CardTitle = styled.div``;

export const CardBody = styled.div`
  color: #888;
`;

// ======================
// ======================
// Custom design elements
// ----------------------

export const TopBar = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;
