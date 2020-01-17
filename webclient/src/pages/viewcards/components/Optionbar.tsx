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
    value: tag.tagID
  }));

  const selectedTags = allTags.filter(
    tag => props.filteredTagIDs.indexOf(tag.value) !== -1
  );

  const setFilter = (values: { label: string; value: string }[]) =>
    props.setFilteredTagIDs(values?.map(v => v.value) || []);

  return (
    <SContainer>
      <SButtonContainer>
        <button className="button" onClick={props.addCard}>
          <span className="icon is-left">
            <i className="far fa-plus-square" />
          </span>
          <span>New card</span>
        </button>
      </SButtonContainer>

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
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (min-width: 731px) {
    & > *:last-child {
      margin-left: 1rem;
    }
  }

  @media only screen and (max-width: 730px) {
    flex-direction: column;
    align-items: stretch;
    & > *:not(:first-child) {
      margin-top: 0.5rem;
    }

    button {
      width: 100%;
    }
  }
`;

const SButtonContainer = styled.div`
  flex-grow: 1;
`;

const SFilterContainer = styled.div`
  min-width: 300px;
  // margin-left: 1rem;
`;
