 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurante.Clases;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;

namespace ControlSoftV1._3.Controllers
{
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/producto/listarProductos")]
        public IEnumerable<ProductoCLS> ListarProductos()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> listaProductos = (from producto in bd.Producto
                                                    join categoria in bd.Categoria
                                                    on producto.Iidcategoria
                                                    equals categoria.Iidcategoria
                                                    where producto.Bhabilitado == 1
                                                    select new ProductoCLS
                                                    {
                                                        IdProducto = producto.Iidproducto,
                                                        Nombre = producto.Nombre,
                                                        Precio = (decimal)producto.Precio,
                                                        Stock = (int)producto.Stock,
                                                        NombreCategoria = categoria.Nombre
                                                    }).ToList();
                return listaProductos;
            }
        }

        [HttpGet]
        [Route("api/producto/filtrarProductoNombre/{nombre}")]
        public IEnumerable<ProductoCLS> FiltrarProductoNombre(string nombre)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> listaProductos = (from producto in bd.Producto
                                                    join categoria in bd.Categoria
                                                    on producto.Iidcategoria
                                                    equals categoria.Iidcategoria
                                                    where producto.Bhabilitado == 1
                                                    && producto.Nombre.ToLower().Contains(nombre.ToLower())
                                                    select new ProductoCLS
                                                    {
                                                        IdProducto = producto.Iidproducto,
                                                        Nombre = producto.Nombre,
                                                        Precio = (decimal)producto.Precio,
                                                        Stock = (int)producto.Stock,
                                                        NombreCategoria = categoria.Nombre
                                                    }).ToList();
                return listaProductos;
            }
        }

        [HttpGet]
        [Route("api/producto/filtrarProductoCategoria/{idCategoria}")]
        public IEnumerable<ProductoCLS> FiltrarProductoCategoria(int idCategoria)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> listaProductos = (from producto in bd.Producto
                                                    join categoria in bd.Categoria
                                                    on producto.Iidcategoria
                                                    equals categoria.Iidcategoria
                                                    where producto.Bhabilitado == 1
                                                    && producto.Iidcategoria == idCategoria
                                                    select new ProductoCLS
                                                    {
                                                        IdProducto = producto.Iidproducto,
                                                        Nombre = producto.Nombre,
                                                        Precio = (decimal)producto.Precio,
                                                        Stock = (int)producto.Stock,
                                                        NombreCategoria = categoria.Nombre
                                                    }).ToList();
                return listaProductos;
            }
        }
    }
}