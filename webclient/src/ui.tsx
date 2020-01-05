import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  font-size: 14px;
  font-family: Arial, Verdana, sans-serif;
  color: #575757;
}
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  height: 100vh;
`;

export const Sidebar = styled.div`
  background: #f4f5f7;
  padding: 1rem;
  display: grid;
  align-content: start;
  grid-row-gap: 5px;
`;

export const SidebarButton = styled.button<{ selected?: boolean }>`
  padding: 0.7rem 1rem;
  text-align: left;
  background: ${p => (p.selected ? "#e3e0fd" : "none")};
  border: none;
  border-radius: 0.3rem;
  transition: 0.2s background;
  cursor: pointer;

  &,
  &:active,
  &:focus {
    outline: none;
  }

  ${p =>
    !p.selected &&
    `
    &:hover {
      background: #ececec;
    }

    &:active {
      background: #d7d7d7;
    }
  `}
`;

export const SidebarLabel = styled.div<{ big?: boolean }>`
  padding: 0.5rem 1rem;
  font-weight: bold;
  ${p => (p.big ? "font-size: 20px;" : "border-bottom: 1px solid #e6e6e6;")}

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  // grid-template: repeat(auto-fit, 200px) / repeat(auto-fit, 400px);
  justify-content: left;
  grid-gap: 1rem;
  padding: 2rem;
  align-content: start;
`;

export const Card = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0px 2px 5px #f0f0f0;
  border: 1px solid #e3e3e3;
`;

export const CardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const CardBody = styled.div`
  line-height: 1.5;
`;

export const CardTags = styled.div`
  margin-top: 0.5rem;
`;

export const CardTag = styled.span`
  background: #ff6e6e;
  padding: 0.1rem 0.3rem;
  color: white;
  border-radius: 0.3rem;

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;
