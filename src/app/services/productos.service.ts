import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/producto.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  Productos: Productos[]=[];
  productosFiltrados: Productos[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
    

  }
  
  private cargarProductos(){

    return new Promise<void>((resolve, reject)=> 
    this.http.get('https://angulartest-b13f2-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {

        console.log(resp);
        this.Productos=resp;
        this.cargando = false;
        resolve();
       
      })
      );

    

  }

  getProducto(id:string) {
      return this.http.get(`https://angulartest-b13f2-default-rtdb.firebaseio.com/productos/${id }.json`);
  }

  buscarProducto( termino: string){
    if(this.productosFiltrados.length ===0){
      //cargar productos
      this.cargarProductos().then (()=>{
        //ejecutar despues de tener los productos
        //Aplicar Filtro
        this.filtrarProductos(termino);
      });

    }else{
      //productos filtrados
      this.filtrarProductos(termino);
    }
    this.productosFiltrados = this.productosFiltrados.filter( producto => {
      return true;
    } )
  }

    private filtrarProductos(termino:string){
      this.productosFiltrados = [];

      termino = termino.toLocaleLowerCase();
      
        

      this.productosFiltrados.forEach(prod => {
        const tituloLower = prod.titulo.toLocaleLowerCase;
        if(prod.categoria.indexOf(termino)>=0 || prod.titulo.indexOf(termino)>=0){
          this.productosFiltrados.push(prod);
        }
      })
    }
}
