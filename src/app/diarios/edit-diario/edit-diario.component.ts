import { DiariosService } from 'src/app/services/diarios.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Diary } from 'src/app/interfaces/diary';

@Component({
  selector: 'app-edit-diario',
  templateUrl: './edit-diario.component.html',
  styleUrls: ['./edit-diario.component.css'],
})
export class EditDiarioComponent implements OnInit {
  @Input() diary: Diary = {} as Diary;

  image: File | null = null;

  changeImage(images: FileList | null) {
    if (images) {
      this.image = images[0];
    }
  }

  onSubmit() {
    if (this.image) {
      this.uploadService.uploadImage(this.image, (url) => {
        this.diary.image = url;
        this.updateDiary();
      });
    } else {
      this.updateDiary();
    }
  }

  //updateDiary ou Diario?
  updateDiary() {
    //depois fecha o modal quando atualizar
    this.diariosService.updateDiary(this.diary).then(this.activeModal.dismiss);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private uploadService: UploadImageService,
    private diariosService: DiariosService
  ) {}

  ngOnInit(): void {}
}