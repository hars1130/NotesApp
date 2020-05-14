import * as fromNote from "../actions/note.actions";
import { Note } from "../models/note";

export interface NoteState {
  data: Note[];
  selectedNote: any;
}

export const initialState: NoteState = {
  data: [],
  selectedNote: undefined 
};

export const getNotes = (state: NoteState) => state.data;
export const getSelectedNote = (state: NoteState) => state.selectedNote;
export const getNotesBySearchString = (state: NoteState, props: { searchStr: string }) =>
  state.data.filter(note => note.content.toUpperCase().search(props.searchStr.toUpperCase()) !== -1);

export function reducer(
  state = initialState,
  action: fromNote.ActionsUnion
): NoteState {
  switch (action.type) {
    case fromNote.ActionTypes.SetPersistedState: {
        return {
          ...state,
          data: action.payload.notes
        };
      }
      
    case fromNote.ActionTypes.CreateNote: {
      return {
        ...state,
        data: [action.payload.note, ...state.data],
        selectedNote : state.data.length>0 ? state.data[0] : undefined
      };
    }

    case fromNote.ActionTypes.SelectNote: {
        return {
          ...state,
          selectedNote: action.payload.note
        };
      }

    case fromNote.ActionTypes.DeleteNote: {
      return {
        ...state,
        ...state.data.splice(state.data.indexOf(action.payload.note), 1),
        selectedNote : state.data.length>0 ? state.data[0] : undefined
      };
    }

    default: {
      return state;
    }
  }
}