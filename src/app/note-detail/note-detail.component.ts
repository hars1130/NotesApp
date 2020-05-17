import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  constructor(public notesService: NotesService) { }

  note: Note;

  ngOnInit() {
    this.notesService.selectedNote.subscribe(selectedNote =>{
        this.note = Object.assign({},selectedNote);
    });
  }

  onChange(){
    this.notesService.editNote(this.note.content);
    this.notesService.save();
  }

}
