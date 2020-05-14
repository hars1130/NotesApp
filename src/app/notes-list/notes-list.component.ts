import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(public notesService: NotesService) { }

  @Input() notes: any[];
  ngOnInit() {
  }

  onNoteClick(note){
    this.notesService.selectNote(note);
  }

}
