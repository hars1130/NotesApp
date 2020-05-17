import { Action } from "@ngrx/store";
import { Note } from "../models/note";

export enum ActionTypes {
  SetPersistedState = "[Notes Service] Set persisted state",
  CreateNote = "[Notes Service] Create note",
  EditNote = "[Notes Service] Edit note",
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

export class EditNote implements Action {
  readonly type = ActionTypes.EditNote;

  constructor(public payload: { note: Note }) {}
}

export class SelectNote implements Action {
  readonly type = ActionTypes.SelectNote;

  constructor(public payload: { note: Note }) {}
}

export class DeleteNote implements Action {
  readonly type = ActionTypes.DeleteNote;

  constructor() {}
}

export type ActionsUnion = CreateNote | EditNote | DeleteNote | SetPersistedState | SelectNote;