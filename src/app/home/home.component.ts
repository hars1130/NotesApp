import { Component, OnInit, HostListener } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { FormsModule } from '@angular/forms';
import { Note } from '../models/note';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public notesService: NotesService) { }
  notes : Note[] = [];
  isNoteListOpen = false;
  isMobile = false;
  userSearch;
  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    this.notesService.load();
    this.notesService.notes.subscribe(notes => {
      this.notes = notes;
    })
    if(window.innerWidth < 769){
      this.isMobile = true;
      this.isNoteListOpen = false;
    }
    else{
      this.isMobile = false;
      this.isNoteListOpen = true;
    }
  }

  createNote(){
    this.notesService.createNote("");
    this.notesService.save();
  }

  onSearch(){
    let searchSubscription = this.notesService.getNotesBySearchString(this.userSearch).subscribe(notes =>{
      this.notes = notes;
    });
    searchSubscription.unsubscribe();
  }

  deleteNote(){
    if(confirm( "Do you really want to delete?")){
    let deletesubscription = this.notesService.selectedNote.pipe(first()).subscribe(selectedNote =>{
      if(selectedNote)
      this.notesService.deleteNote(selectedNote);
    });
    deletesubscription.unsubscribe();
    this.notesService.save();
    }
  }

  toggleNoteList(){
    this.isNoteListOpen = ! this.isNoteListOpen;
  }

  onResize(event) {
    //769 is max width of tablet
    if(window.innerWidth < 769){
      this.isMobile = true;
      this.isNoteListOpen = false;
    }
    else{
      this.isMobile = false;
      this.isNoteListOpen = true;
    }
  }

}
