import { Departamento } from './Departamento';
export class Distrito {
  id: number;
  nombre: string;
  abreviatura: string;
  habilitacion: number;
  idDepartamento: number;
  departamentoByFkdepartamentosid: Departamento;
}
