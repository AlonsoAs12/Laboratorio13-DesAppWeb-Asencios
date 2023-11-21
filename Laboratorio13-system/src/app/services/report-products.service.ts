import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ReportProductsService {
  url = "http://localhost:4000/api/productos/";

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {
    return this.http.get(this.url)
  }
}
