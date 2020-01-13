import React from "react";
import styled from "styled-components";

export const Notification = ({
  message,
  color
}: {
  message: string;
  color: string;
}) => (
  <SOuter>
    <SNotification color={color}>{message}</SNotification>
  </SOuter>
);

const SOuter = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0.5rem;
  max-width: 600px;
`;

const SNotification = styled.div<{ color: string }>`
  padding: 0.5rem;
  color: white;
  border-radius: 0.5rem;
  line-height: 1.8rem;
  box-shadow: 0 1px 2px #e4e4e4, 0 2px 4px #d5d5d5;
  background: ${p => p.color};
`;
