import { observer, useAsObservableSource, useLocalStore } from "mobx-react";
import React from "react";
import CreatableSelect from "react-select/creatable";
import { Tag } from "../../../interface/model";

type Props = {
  allTags: Tag[];
  selectedTagIDs: string[];
  change: (value: { label: string; value: string }[]) => void;
  addTag: (text: string) => Promise<Tag | undefined>;
};

export default observer((rawProps: Props) => {
  const props = useAsObservableSource(rawProps);

  const allTagIDs = props.allTags.map(tag => tag.tagID);

  const selected = props.selectedTagIDs.map(tagID => ({
    label: props.allTags[allTagIDs.indexOf(tagID)].text,
    value: tagID
  }));

  const state = useLocalStore(() => ({ creating: false }));

  const options = props.allTags.map(tag => ({
    label: tag.text,
    value: tag.tagID
  }));

  const create = async (text: string) => {
    state.creating = true;
    await props.addTag(text);
    state.creating = false;
  };

  return (
    <div>
      <CreatableSelect
        closeMenuOnSelect={false}
        isMulti
        isClearable
        isLoading={state.creating}
        isDisabled={state.creating}
        options={options}
        value={selected}
        onChange={props.change as any}
        onCreateOption={create}
      />
    </div>
  );
});
