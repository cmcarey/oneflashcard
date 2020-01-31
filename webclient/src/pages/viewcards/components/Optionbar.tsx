import { observer } from "mobx-react";
import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { Tag } from "../../../interface/model";

type Props = {
  allTags: Tag[];
  filteredTagIDs: string[];
  setFilteredTagIDs: (ids: string[]) => void;
  filterString: string;
  setFilterString: (s: string) => void;
  addCard: () => void;
};

export default observer((props: Props) => {
  const allTags = props.allTags.map(tag => ({
    label: tag.text,
    value: tag.tag_id
  }));

  const selectedTags = allTags.filter(
    tag => props.filteredTagIDs.indexOf(tag.value) !== -1
  );

  const setFilter = (values: { label: string; value: string }[]) =>
    props.setFilteredTagIDs(values?.map(v => v.value) || []);

  return (
    <SContainer>
      <button className="button" onClick={props.addCard}>
        <span className="icon is-left">
          <i className="far fa-plus-square" />
        </span>
        <span>New card</span>
      </button>

      <SFilterButton className="button">
        <span className="icon is-left">
          <i className="fas fa-filter" />
        </span>
        <span>Filter</span>
      </SFilterButton>

      <SFilterOptions>
        <div className="control has-icons-left">
          <input
            className="input"
            placeholder="Search by card title"
            value={props.filterString}
            onChange={e => props.setFilterString(e.target.value)}
          ></input>
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
      </SFilterOptions>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SFilterButton = styled.div`
  @media only screen and (min-width: 751px) {
    display: none;
  }

  &:hover + * {
    display: grid;
  }
`;

const SFilterContainer = styled.div`
  min-width: 180px;
`;

const SFilterOptions = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;
  align-items: center;

  @media only screen and (max-width: 750px) {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: white;
    grid-auto-flow: row;
    padding: 1rem;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0px 0 1px rgba(10, 10, 10, 0.02);
    border-radius: 6px;

    &:hover {
      display: grid;
    }
  }
`;
