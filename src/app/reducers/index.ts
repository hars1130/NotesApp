import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromNote from "./note.reducer";

export interface AppState {
  notes: fromNote.NoteState;
}

export const reducers: ActionReducerMap<AppState> = {
  notes: fromNote.reducer
};

export const getNoteState = (state: AppState) => state.notes;

export const getAllNotes = createSelector(
  getNoteState,
  fromNote.getNotes
);

export const getNotesBySearchString = createSelector(
  getNoteState,
  fromNote.getNotesBySearchString
);

export const getSelectedNote = createSelector(
  getNoteState,
  fromNote.getSelectedNote
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];