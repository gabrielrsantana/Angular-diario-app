import { DiariosService } from 'src/app/services/diarios.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { Diary } from 'src/app/interfaces/diary';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-diario',
  templateUrl: './add-diario.component.html',
  styleUrls: ['./add-diario.component.css'],
})
export class AddDiarioComponent implements OnInit {
  diary: Diary = {} as Diary;
  image: File | null = null;

  changeImage(images: FileList | null) {
    if (images) {
      this.image = images[0];
    }
  }

  onSubmit() {
    this.uploadService.uploadImage(this.image!, (url) => {
      this.diary.image = url;
      this.addDiario();
    });
  }

  addDiario() {
    this.diariosService.add(this.diary).then(this.activeModal.dismiss);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private uploadService: UploadImageService,
    private diariosService: DiariosService
  ) {}

  ngOnInit(): void {}
}