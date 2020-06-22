import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductoServices } from '../../Servicios/producto.Services';
import { CategoriaServicio } from '../../Servicios/categoria.servicio.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styles: []
})
export class FormularioProductoComponent implements OnInit {
  producto: FormGroup;
  marcas: any;
  categorias: any;
  titulo = "";
  parametro = "";
  constructor(private productoServices: ProductoServices,
    private categoriaServices: CategoriaServicio,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.producto = new FormGroup(
      {
        'idProducto': new FormControl("0"),
        'nombre': new FormControl("", [Validators.required]),
        'precio': new FormControl("0", [Validators.required]),
        'stock': new FormControl("",[Validators.required, this.noPuntoDecimal]),
        'idMarca': new FormControl("", [Validators.required]),
        'idCategoria': new FormControl("", [Validators.required]),
      }
    );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(rsp => {
      //this.parametro = rsp["id"];
      if (rsp["id"] == "nuevo") {
        this.titulo = "Crear producto";
      } else {
        this.titulo = "Editar producto";
        this.editarProducto(rsp["id"]);
      }
    });

    this.productoServices.getMarcas().subscribe(rsp => this.marcas = rsp);

    this.categoriaServices.getCategoria().subscribe(rsp => this.categorias = rsp);
  }
editarProducto(id) {
  this.productoServices.getProducto(id).subscribe(rsp => {
    console.log(rsp);
    this.producto.controls["idProducto"].setValue(rsp["idProducto"]);
    this.producto.controls["nombre"].setValue(rsp["nombre"]);
    this.producto.controls["precio"].setValue(rsp["precio"]);
    this.producto.controls["stock"].setValue(rsp["stock"]);
    this.producto.controls["idMarca"].setValue(rsp["idMarca"]);
    this.producto.controls["idCategoria"].setValue(rsp["idCategoria"]);
  });
  }
  guardar() {
    if (this.producto.valid) {
      this.productoServices.insertarProducto(this.producto.value).subscribe(rsp => {
        this.router.navigate(['/productos']);
      });
    }
  }
  //Validaciones personalizadas
  noPuntoDecimal(control: FormControl) {
    if ((<string>control.value.toString()).indexOf('.') > -1) {
      return { puntoDecimal: true };
    } else {
      return null;
    }
  }
}
