import { Action } from "@ngrx/store";
import { Note } from "../models/note";

export enum ActionTypes {
  SetPersistedState = "[Notes Service] Set persisted state",
  CreateNote = "[Notes Service] Create note",
  SelectNote = "[Notes Service] Select note",
  DeleteNote = "[Notes Service] Delete note"
}

export class SetPersistedState implements Action {
  readonly type = ActionTypes.SetPersistedState;

  constructor(public payload: { notes: Note[] }) {}
}

export class CreateNote implements Action {
  readonly type = ActionTypes.CreateNote;

  constructor(public payload: { note: Note }) {}
}

export class SelectNote implements Action {
  readonly type = ActionTypes.SelectNote;

  constructor(public payload: { note: Note }) {}
}

export class DeleteNote implements Action {
  readonly type = ActionTypes.DeleteNote;

  constructor(public payload: { note: Note }) {}
}

export type ActionsUnion = CreateNote | DeleteNote | SetPersistedState | SelectNote;