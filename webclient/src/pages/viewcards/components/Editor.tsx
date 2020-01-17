import { observer, useAsObservableSource, useLocalStore } from "mobx-react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { LinkedCard, Tag } from "../../../interface/model";
import SCardBox from "../styles/SCardBox";
import TagSelector from "./TagSelector";

type Props = {
  card?: LinkedCard;
  allTags: Tag[];
  addTag: (text: string) => Promise<Tag | undefined>;
  closeEditor: () => void;
  submitCard: (title: string, text: string, tagIDs: string[]) => void;
  deleteCard?: () => void;
};

export default observer((rawProps: Props) => {
  const props = useAsObservableSource(rawProps);

  const state = useLocalStore(() => ({
    loading: false,
    title: props.card?.title || "",
    text: props.card?.text || "",
    tagIDs: props.card?.tags.map(tag => tag.tagID) || [],
    lastPropTagIDs: props.card?.tags.map(tag => tag.tagID) || []
  }));

  if (props.card) {
    // Check each tag ID is in state.lastPropTagIDs
    // If not and not in tagIDs, add there, then add to tagIDs
    props.card.tags.forEach(tag => {
      if (
        state.lastPropTagIDs.indexOf(tag.tagID) === -1 &&
        state.tagIDs.indexOf(tag.tagID) === -1
      ) {
        state.lastPropTagIDs.push(tag.tagID);
        state.tagIDs.push(tag.tagID);
      }
    });
  }

  const changeTagIDs = (value: { label: string; value: string }[]) => {
    state.tagIDs = value?.map(v => v.value) || [];
  };

  const addTag = async (text: string): Promise<Tag | undefined> => {
    const t = await props.addTag(text);
    if (t) state.tagIDs.push(t.tagID);
    return t;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.loading) return;
    state.loading = true;

    props.submitCard(state.title, state.text, state.tagIDs);
  };

  const deleteCard = () => {
    state.loading = true;

    props.deleteCard!();
  };

  const submitClass = state.loading ? "is-loading" : "";

  return (
    <SBox>
      <form onSubmit={submit}>
        <div className="field">
          <label className="label">Card title</label>
          <div className="control has-icons-left">
            <input
              autoFocus
              className="input"
              value={state.title}
              onChange={e => (state.title = e.target.value)}
            />
            <span className="icon is-left">
              <i className="fas fa-heading" />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Card text</label>
          <div className="control">
            <STextArea
              className="textarea"
              value={state.text}
              onChange={e => (state.text = e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Card tags</label>
          <TagSelector
            addTag={addTag}
            allTags={props.allTags}
            selectedTagIDs={state.tagIDs}
            change={changeTagIDs}
          />
        </div>

        <div className="buttons">
          <button
            className={`button is-outlined is-small is-link ${submitClass}`}
          >
            Update
          </button>
          {!state.loading && (
            <div>
              <button
                onClick={props.closeEditor}
                className="button is-outlined is-small is-primary"
              >
                Cancel
              </button>
              {props.deleteCard && (
                <button
                  onClick={deleteCard}
                  className="button is-outlined is-small is-danger"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </SBox>
  );
});

const SBox = styled(SCardBox)`
  background: #faf6ff;
`;

const STextArea = styled(TextareaAutosize)`
  resize: none;
  font-size: 0.9rem;
`;
