import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(file:File,onUpload:(imageUrl:string)=>void){
    const time = new Date();
    const filename= `${time}${file.name}`;
    //caminho do arquivo
    const ref = this.storage.ref(filename);
    const task = this.storage.upload(filename,file); //pegar nome do arquivo,pra quando adicionar diario
    //progresso do upload
    task.snapshotChanges()
    .pipe(finalize(()=> ref.getDownloadURL().subscribe(onUpload))).subscribe();//so quando upload terminar
  }//upload

}//exports
