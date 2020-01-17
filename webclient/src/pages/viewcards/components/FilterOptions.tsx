import { observer } from "mobx-react";
import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { Tag } from "../../../interface/model";

type Props = {
  allTags: Tag[];
  filteredTagIDs: string[];
  setFilteredTagIDs: (ids: string[]) => void;
};

export default observer((props: Props) => {
  const allTags = props.allTags.map(tag => ({
    label: tag.text,
    value: tag.tagID
  }));

  const selectedTags = allTags.filter(
    tag => props.filteredTagIDs.indexOf(tag.value) !== -1
  );

  const setFilter = (values: { label: string; value: string }[]) =>
    props.setFilteredTagIDs(values?.map(v => v.value) || []);

  return (
    <SContainer>
      <div className="control has-icons-left">
        <input className="input" placeholder="Search by card title"></input>
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>
      </div>
      <SFilterContainer>
        <Select
          isMulti
          closeMenuOnSelect={false}
          placeholder="Filter by card tag"
          options={allTags}
          value={selectedTags}
          onChange={setFilter as any}
        />
      </SFilterContainer>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: left;
`;

const SFilterContainer = styled.div`
  min-width: 300px;
`;
