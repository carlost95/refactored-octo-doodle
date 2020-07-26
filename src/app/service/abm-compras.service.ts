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
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class AbmComprasService {
// DE MANERA LOCAL

  Url =environment.url;

  constructor(private http: HttpClient) {}

  // SERVICE DE BANCOS
  listarBancosTodos() {
    return this.http.get<Response>(this.Url + "/bancos");
  }
  guardarBanco(banco: Banco) {
    return this.http.post<Banco>(this.Url + "/bancos/", banco);
  }
  actualizarBanco(banco: Banco) {
    return this.http.put<Banco>(this.Url + "/bancos/", banco);
  }
  listarBancoId(id: number) {
    return this.http.get<Response>(this.Url + "/bancos/" + id);
  }
  desabilitarBanco(id: number) {
    return this.http.delete(this.Url + "/bancos/" + id);
  }

  //SERVICE DE MARCAS
  listarMarcaTodos() {
    return this.http.get<Response>(this.Url+ "/marcas");
    // return this.http.get<Response>('../../assets/mocks/marca.json');
  }
  listarMarcaHabilitados() {
    return this.http.get<Response>(this.Url+ "/marcas/habilitados");
    // return this.http.get<Response>('../../assets/mocks/marca.json');
  }
  guardarMarca(marca: Marca) {
    return this.http.post<Marca>(this.Url + "/marcas/", marca);
    // return this.http.post<Response>('../../assets/mocks/marca.json', marca.);
  }
  actualizarMarca(marca: Marca) {
    return this.http.put<Marca>(this.Url + "/marcas/", marca);
  }
  listarMarcaId(id: number) {
    return this.http.get<Response>(this.Url + "/marcas/" + id);
  }
  desabilitarMarca(id: number) {
    return this.http.delete(this.Url + "/marcas/" + id);
  }

 //SERVICE DE FORMA DE PAGO
 listarFormaPagoTodos() {
  return this.http.get<Response>(this.Url+ "/forma-pago");
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
//SERVICE DE UNIDAD DE MEDIDA
listarUnidadMedidaTodos() {
  return this.http.get<Response>(this.Url+ "/unidad-medida");
}
listarUnidadMedidaHabilitados() {
  return this.http.get<Response>(this.Url+ "/unidad-medida/habilitados");
}
guardarUnidadMedida(unidadMedida: UnidadMedida) {
  return this.http.post<UnidadMedida>(this.Url + "/unidad-medida/", unidadMedida);
}
actualizarUnidadMedida(unidadMedida: UnidadMedida) {
  return this.http.put<UnidadMedida>(this.Url + "/unidad-medida/", unidadMedida);
}
listarUnidadMedidaId(id: number) {
  return this.http.get<Response>(this.Url + "/unidad-medida/" + id);
}
desabilitarUnidadMedida(id: number) {
  return this.http.delete(this.Url + "/unidad-medida/" + id);
}
//SERVICE DE RUBROS
listarRubrosTodos() {
  return this.http.get<Response>(this.Url+ "/rubro");
}
listarRubrosHabilitados() {
  return this.http.get<Response>(this.Url+ "/rubro/habilitados");
}
guardarRubro(rubro: Rubro) {
  return this.http.post<Rubro>(this.Url + "/rubro/", rubro);
}
actualizarRubro(rubro: Rubro) {
  return this.http.put<Rubro>(this.Url + "/rubro/", rubro);
}
listarRubroId(id: number) {
  return this.http.get<Response>(this.Url + "/rubro/" + id);
}
desabilitarRubro(id: number) {
  return this.http.delete(this.Url + "/rubro/" + id);
}
//SERVICE DE SUB-RUBROS
listarSubRubrosTodos() {
  return this.http.get<Response>(this.Url+ "/sub-rubros");
}
listarSubRubrosHabilitados() {
  return this.http.get<Response>(this.Url+ "/sub-rubros/habilitados");
}
listarSubRubrosPorIdRubro(id : number) {
  return this.http.get<Response>(this.Url+ "/sub-rubros/rubro/" + id);
}
guardarSubRubro(subRubroDTO: SubRubroDTO) {
  return this.http.post<SubRubroDTO>(this.Url + "/sub-rubros/", subRubroDTO);
}
actualizarSubRubro(subRubroDTO: SubRubroDTO) {
  return this.http.put<SubRubroDTO>(this.Url + "/sub-rubros/", subRubroDTO);
}
listarSubRubroId(id: number) {
  return this.http.get<Response[]>(this.Url + "/sub-rubros/" + id);
}
desabilitarSubRubro(id: number) {
  return this.http.delete(this.Url + "/sub-rubros/" + id);
}
 // SERVICE THE AJUSTES
 listarAjustesTodos() {
  return this.http.get<Response>(this.Url+ "/ajustes");
}
listarAjustesHabilitados() {
  return this.http.get<Response>(this.Url+ "/ajustes/habilitados");
}
async guardarAjustes(ajuste: Ajuste) {
  let ajustes = await this.http.post<Response>(this.Url + "/ajustes/", ajuste).toPromise();
  return ajustes;
}
actualizarAjuste(ajuste: Ajuste) {
  return this.http.put<Ajuste>(this.Url + "/ajustes/", ajuste);
}
listarAjusteId(id: number) {
  return this.http.get<Response>(this.Url + "/ajustes/" + id);
}
desabilitarAjuste(id: number) {
  return this.http.delete(this.Url + "/ajustes/" + id);
}
}
