import { EditDiarioComponent } from './edit-diario/edit-diario.component';
import { AddDiarioComponent } from './add-diario/add-diario.component';
import { AuthService } from './../services/auth.service';
import { Diary } from './../interfaces/diary';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiariosService } from '../services/diarios.service';

@Component({
  selector: 'app-diarios',
  templateUrl: './diarios.component.html',
  styleUrls: ['./diarios.component.css'],
})
export class DiariosComponent implements OnInit {
  constructor( private modalService: NgbModal, private diariosService: DiariosService,
    private authService: AuthService
  ) {}

  diarios$?: Observable<Diary[]>;
  diarios: Diary[] = [];

  openAddDiarioModal() {
    this.modalService.open(AddDiarioComponent);
  }

  openUpdateDiarioModal(diary: Diary) {
    const modalRef = this.modalService.open(EditDiarioComponent);
    modalRef.componentInstance.diary = diary;
  }

  deleteDiario(diary: Diary) {
    window.confirm('Tem certeza?') && this.diariosService.deleteDiary(diary);
  }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.diarios$ = this.diariosService.getDiaries(user.uid!);
      }
    });
  }
  
}