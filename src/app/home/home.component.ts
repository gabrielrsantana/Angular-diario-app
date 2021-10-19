import { Diary } from './../interfaces/diary';
import { DiariosService } from 'src/app/services/diarios.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allDiaries$?: Observable<Diary[]>;
  allDiarios: Diary[] = [];
  constructor(private diariosService: DiariosService) {}

  ngOnInit(): void {
    this.allDiaries$ = this.diariosService.getAllDiaries();
  }
}