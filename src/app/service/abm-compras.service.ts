import { Ajuste } from './../modelo/Ajuste';
import { SubRubroDTO } from './../modelo/SubRubroDTO';
import { SubRubro } from './../modelo/SubRubro';
import { Rubro } from './../modelo/Rubro';
import { UnidadMedida } from './../modelo/UnidadMedida';
import { FormaPago } from './../modelo/FormaPago';
import { Marca } from './../modelo/Marca';
import { Banco } from "./../modelo/Banco";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "../modelo/Response";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AbmComprasService {

  Url = environment.url;

  constructor(private http: HttpClient) { }

  //SERVICE DE FORMA DE PAGO
  listarFormaPagoTodos() {
    return this.http.get<Response>(this.Url + "/forma-pago");
  }
  guardarFormaPago(formaPago: FormaPago) {
    return this.http.post<FormaPago>(this.Url + "/forma-pago/", formaPago);
  }
  actualizarFormaPago(formaPago: FormaPago) {
    return this.http.put<FormaPago>(this.Url + "/forma-pago/", formaPago);
  }
  listarformaPagoId(id: number) {
    return this.http.get<Response>(this.Url + "/forma-pago/" + id);
  }
  desabilitarFormaPago(id: number) {
    return this.http.delete(this.Url + "/forma-pago/" + id);
  }

}
