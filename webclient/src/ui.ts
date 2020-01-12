import { Link } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";

export const present = false;

// =============
// =============
// Global design
// -------------

export const GlobalStyle = createGlobalStyle`
body {
  background: #f6f7fc;

  ${present &&
    `
    background: white;
  `}
}

#root {
  font-family: "Source Sans Pro", sans-serif;
  padding-bottom: 0.5rem;

  ${present &&
    `
    background: #f6f7fc;
    width: 870px;
    overflow: hidden;
    margin: 20px;
    border-radius: 1rem;
  `}
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

export const PageCenterBox = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 0.5rem;

  ${present &&
    `
    max-width: 800px;
  `}
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

export const BarButton = styled(Link)<{ selected?: boolean }>`
  :not(:first-child) {
    margin-left: 2rem;
  }

  :hover {
    color: #444;
    border-bottom-color: #444;
  }

  :focus {
    outline: none;
  }

  padding: 0.7rem 0;
  border-bottom: 1px solid transparent;
  transition: 0.2s border-bottom-color;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  ${p =>
    p.selected &&
    `
    &, :hover {
      color: #5050ff;
      border-bottom-color: #5050ff;
    }
  `}
`;

export const Body = styled.div`
  margin-top: 2rem;
`;

export const BodyBar = styled.div`
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BodyTitle = styled.div`
  font-size: 1.5rem;
  color: #888;
`;

export const BodyBarAction = styled.div`
  :hover {
    border-color: #5050ff;
    color: #5050ff;
  }

  float: right;

  border: 1px solid #ddd;
  color: #575757;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: 0.1s border-color;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  ${present &&
    `
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  `}
`;

export const Box = styled.div`
  padding: 0.5rem;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px #e8e8e8;
  align-self: start;
`;

export const BoxTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const BoxBody = styled.div`
  color: #888;
`;

export const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 0.5rem;

  padding-top: 0.5rem;
  font-size: 0.7rem;
`;

export const Tag = styled.div<{ color: string }>`
  background: ${p => p.color};
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;
`;

export const Form = styled.form`
  display: grid;
  grid-gap: 0.5rem;
`;

const FormStyles = css`
  padding: 0.3rem;
  border: 1px solid #e4e4e4;
  border-radius: 0.3rem;
  transition: 0.1s border-color, 0.1s background;

  :focus {
    border-color: #0e4bff;
  }
`;

export const FormInput = styled.input`
  ${FormStyles}
`;

export const FormButton = styled.button`
  ${FormStyles}
  justify-self: right;
  background: none;
  color: #0e4bff;

  :hover {
    border-color: #0e4bff;
  }

  :focus {
    outline: none;
  }

  :active {
    background: #f1f4ff;
    border-color: #0e4bff;
  }
`;
