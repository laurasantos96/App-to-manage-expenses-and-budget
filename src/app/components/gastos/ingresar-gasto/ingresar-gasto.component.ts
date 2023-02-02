import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent {

    nombreGasto: string;
    cantidad: number;
    formularioIncorrecto: boolean;
    textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService){
    this.nombreGasto = '';
    this.cantidad = 0,
    this.formularioIncorrecto = false;
    this.textIncorrecto = 'Nombre gasto o cantidad incorrecta';
  }

  ngOnInit(): void{ }

  agregarGasto(){

      if(this.cantidad > this._presupuestoService.restante){
        this.formularioIncorrecto = true;
        this.textIncorrecto = 'Cantidad ingresada es mayor a la restante';
        return;
      }


    if(this.nombreGasto === '' || this.cantidad <= 0){
      this.formularioIncorrecto = true;
    } else{

      //crear objeto 
        const GASTO = {
          nombre: this.nombreGasto,
          cantidad: this.cantidad
        }
      //enviar el objeto a los suscriptores via subject
        this._presupuestoService.agregarGasto(GASTO);
      //resetear formulario

      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  };
}
