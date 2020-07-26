import { SubRubro } from './SubRubro';
import { Rubro } from './Rubro';
import { Marca } from './Marca';
import { UnidadMedida } from './UnidadMedida';
import { Proveedor } from './Proveedor';
export class Articulo{
  id : number;
  nombre: string;
  abreviatura: string;
  codigoArt: string;
  stockMin: number;
  stockMax: number;
  habilitacion: number;
  proveedorId: Proveedor;
  unidadMedidaId: UnidadMedida;
  marcaId: Marca;
  rubroId: Rubro;
  subRubroId: SubRubro;

}
