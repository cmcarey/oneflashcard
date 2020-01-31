import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Tag } from "../../../interface/model";
import ColTag from "./ColTag";

type Props = {
  tags: Tag[];
  updateTag: (tag: Tag) => void;
  deleteTag: (tagID: string) => void;
};

export default observer((props: Props) => {
  return (
    <STagContainer>
      {props.tags.map(tag => (
        <ColTag
          key={tag.tag_id}
          tag={tag}
          updateTag={props.updateTag}
          deleteTag={props.deleteTag}
        />
      ))}
    </STagContainer>
  );
});

const STagContainer = styled.div.attrs({ className: "box" })`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  padding-top: calc(20px - 0.5rem);
  // float: left;
`;
