import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '@models/Proveedor';
import { proveedor } from '../../environments/global-route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + proveedor.path;
  }
  getAllProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.url);
  }
  getEnabledSupplier(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.url + '/habilitados');
  }
  getSupplierById(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.url + '/' + id);
  }
  saveProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.url, proveedor);
  }
  updatedProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(this.url, proveedor);
  }
  changeStatusProveedor(id: number): Observable<Proveedor> {
    return this.http.put<Proveedor>(this.url + '/' + id, id);
  }
}
