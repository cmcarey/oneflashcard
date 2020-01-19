import { observer } from "mobx-react";
import React from "react";
import { Tag } from "../../interface/model";
import Body from "../../shared/components/Body";
import cardStore from "../../stores/cardStore";
import Tagtable from "./components/Tagtable";

export default observer(() => {
  const tags = cardStore.tags;

  const updateTag = (tag: Tag) => cardStore.updateTag(tag);

  return (
    <Body>
      <Tagtable tags={tags} updateTag={updateTag} />
    </Body>
  );
});
