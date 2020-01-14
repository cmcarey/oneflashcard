import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import {
  SBody,
  SBodyHeader,
  SBodyTitle,
  SCenter,
  SForm,
  SFormInput,
  SFormTextArea
} from "../../SharedStyles";

export const CardEditorView = ({
  isEditing,
  initialValues,
  onSubmit
}: {
  isEditing: boolean;
  initialValues: { title: string; text: string; tagIDs: string[] };
  onSubmit: (values: { title: string; text: string; tagIDs: string[] }) => void;
}) => {
  return (
    <SBody>
      <SCenter>
        <SBodyHeader>
          <SBodyTitle>{isEditing ? "Editing" : "Adding"} card</SBodyTitle>
        </SBodyHeader>
        <Formik {...{ initialValues, onSubmit }}>
          {props => (
            <SForm onSubmit={props.handleSubmit}>
              <SLabel>
                <SLabelName>Card title</SLabelName>
                <SLabelDescription>Title of the card</SLabelDescription>
                <SFormInput />
              </SLabel>

              <SLabel>
                <SLabelName>Card text</SLabelName>
                <SLabelDescription>Text of the card</SLabelDescription>
                <SFormTextArea />
              </SLabel>
            </SForm>
          )}
        </Formik>
      </SCenter>
    </SBody>
  );
};

const SLabel = styled.label`
  display: grid;
  grid-gap: 0.5rem;
  max-width: 500px;
`;

const SLabelName = styled.div`
  font-weight: bold;
`;

const SLabelDescription = styled.div`
  color: #888;
`;
