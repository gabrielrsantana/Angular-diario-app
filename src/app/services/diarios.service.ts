import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Diary } from '../interfaces/diary';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DiariosService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  getDiaries(ownerKey: string) {
    return this.db
      .collection<Diary>('diaries', (ref) =>
        ref.where('ownerKey', '==', ownerKey)
      )
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Diary;
          });
        })
      );
  }

  getAllDiaries(){
   return this.db.collection<Diary>('diaries').valueChanges();// obervable, tem que coloca o tipo Diary
  }


  add(diary: Diary) {
    diary.ownerKey = this.authService.userData.uid;
    diary.author = this.authService.userData.displayName;
    return this.db.collection('diaries').add(diary);
  }//add

  //se nao existir o 'diaries', ele cria
  deleteDiary(diary: Diary) {
  return  this.db.collection('diaries').doc(diary.key).delete();
  }

  updateDiary(diary: Diary) {
   return this.db.collection('diaries').doc('diary.key').update(diary); //set limpa,update atualiza
  }

}//export
