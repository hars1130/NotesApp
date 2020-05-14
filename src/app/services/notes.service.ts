import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { Note } from "../models/note";
import * as NoteActions from "../actions/note.actions";
import { AppState, getAllNotes, getNotesBySearchString, getSelectedNote } from "../reducers";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  public notes: Observable<Note[]>;
  public persistedState = [];
  public loaded: boolean = false;
  public selectedNote: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.notes = this.store.select(getAllNotes);
    this.selectedNote = this.store.select(getSelectedNote);
  }

  load(): Promise<boolean> {
    // Return a promise so that we know when this operation has completed 
    // fetching data from local storage is fast, promise can be useful when we fetch from api
    return new Promise((resolve) => {
      if (window.localStorage) {
        // localStorage supported
        if (localStorage.length > 0) {
          // We have items in localStroage
          // Get the notes that were saved into storage
          let notes = JSON.parse(localStorage.getItem("notes"));
          // Only set this.notes to the returned value if there were values stored
          if (notes != null) {
            this.persistedState = notes;
            this.store.dispatch(new NoteActions.SetPersistedState({ notes: notes }));
          }
        }
      }
      // This allows us to check if the data has been loaded in or not
      this.loaded = true;
      resolve(true);
    });
  }

  save(): void {
    let notes;
    let notesSubscription = this.notes.subscribe(notesList => {
      notes = notesList;
    });
    // Save the current array of notes to storage
    localStorage.setItem("notes", JSON.stringify(notes));
    notesSubscription.unsubscribe();
  }

  getNotesBySearchString(searchStr: string): Observable<Note[]> {
    return this.store.select(getNotesBySearchString, {
      searchStr: searchStr
    });
  }

  createNote(content): void {
    let date = new Date();
    let note = {
      timeStamp: date.toLocaleString(),
      content: content
    };

    this.store.dispatch(new NoteActions.CreateNote({ note: note }));
  }

  selectNote(note): void {
    this.store.dispatch(new NoteActions.SelectNote({ note: note }));
  }

  deleteNote(note): void {
    this.store.dispatch(new NoteActions.DeleteNote({ note: note }));
  }
}
