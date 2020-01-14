import styled, { createGlobalStyle, css } from "styled-components";

// =============
// =============
// Global design
// -------------

export const GlobalStyle = createGlobalStyle`
body {
  background: #f6f7fc;
}

#root {
  font-family: "Source Sans Pro", sans-serif;
  padding-bottom: 0.5rem;
}
`;

// =======================
// =======================
// Shared design elements
// -----------------------

export const SVertbar = styled.div`
  background: white;
  border-bottom: 1px solid #ddd;
  color: #888;
`;

export const SCenter = styled.div`
  margin: 0 auto;
  max-width: 1400px;

  padding: 0 0.5rem;
`;

export const SBody = styled.div`
  margin-top: 2rem;
`;

export const SBodyHeader = styled.div`
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SBodyTitle = styled.div`
  font-size: 1.5rem;
  color: #888;
`;

export const SBodyAction = styled.div`
  :hover {
    border-color: #5050ff;
    color: #5050ff;
  }

  float: right;

  display: flex;
  align-items: center;
  padding: 0 0.5rem;

  border: 1px solid #ddd;
  color: #575757;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: 0.1s border-color;
`;

export const SBox = styled.div`
  max-width: 500px;

  padding: 0.5rem;
  display: grid;
  grid-gap: 0.5rem;
  align-content: start;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px #e8e8e8;
`;

export const SBoxTitle = styled.div`
  font-weight: bold;
`;

export const SBoxBody = styled.div`
  color: #888;
`;

export const SForm = styled.form`
  display: grid;
  grid-gap: 0.5rem;
`;

const formStyles = css`
  padding: 0.3rem;

  border: 1px solid #e4e4e4;
  border-radius: 0.3rem;
  transition: 0.1s border-color, 0.1s background;

  :focus {
    border-color: #0e4bff;
  }
`;

export const SFormInput = styled.input`
  ${formStyles};
`;

export const SFormTextArea = styled.textarea`
  ${formStyles};
`;

export const SFormButton = styled.button`
  ${formStyles};

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

  justify-self: right;

  background: none;
  color: #0e4bff;
`;
