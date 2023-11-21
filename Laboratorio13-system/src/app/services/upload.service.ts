import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private htpp: HttpClient) { }

  uploadFile(formData: any){
    const urlApi = 'http://localhost:4000/api/subir';
    return this.htpp.post(urlApi, formData);
  }
}
