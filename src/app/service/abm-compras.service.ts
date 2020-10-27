import { Ajuste } from '../models/Ajuste';
import { SubRubroDTO } from '../models/SubRubroDTO';
import { SubRubro } from '../models/SubRubro';
import { Rubro } from '../models/Rubro';
import { UnidadMedida } from '../models/UnidadMedida';
import { FormaPago } from '../models/FormaPago';
import { Marca } from '../models/Marca';
import { Banco } from "../models/Banco";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "../models/Response";
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
