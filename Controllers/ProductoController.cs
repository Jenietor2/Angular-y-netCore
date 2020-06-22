using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurante.Clases;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;

namespace ControlSoftV1._3.Controllers
{
    [Route("Api/[Controller]")]
    [ApiController]
    public class ProductoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("listarProductos")]
        //[Route("api/producto/listarProductos")]
        public IEnumerable<ProductoCLS> ListarProductos()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<ProductoCLS> listaProductos = (from producto in bd.Producto
                                                    join categoria in bd.Categoria
                                                    on producto.Iidcategoria equals categoria.Iidcategoria
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

        [HttpGet("filtrarProductoNombre/{nombre}")]
        //[Route("api/producto/filtrarProductoNombre/{nombre}")]
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

        [HttpGet("filtrarProductoCategoria/{idCategoria}")]
        //[Route("api/producto/filtrarProductoCategoria/{idCategoria}")]
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

        [HttpGet("ListarMarcas")]
        //[Route("api/producto/ListarMarcas")]
        public IEnumerable<MarcaCLS> ListarMarcas()
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                List<MarcaCLS> listMarcas = (from marca in context.Marca
                                             where marca.Bhabilitado == 1
                                             select new MarcaCLS
                                             {
                                                 IdMarca = marca.Iidmarca,
                                                 Nombre = marca.Nombre
                                             }).ToList();
                return listMarcas;
            }
        }

        [HttpGet("GetProductoId/{idProducto}")]
        //[Route("api/producto/GetProductoId/{idProducto}")]
        public ProductoCLS GetProductoId(int idProducto)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                ProductoCLS productoEdit = (from producto in context.Producto
                                            where producto.Bhabilitado == 1
                                            && producto.Iidproducto == idProducto
                                            select new ProductoCLS
                                            {
                                                IdProducto = producto.Iidproducto,
                                                Nombre = producto.Nombre,
                                                Precio = (decimal)producto.Precio,
                                                idCategoria = (int)producto.Iidcategoria,
                                                IdMarca = (int)producto.Iidcategoria,
                                                Stock = (int)producto.Stock
                                            }).First();
                return productoEdit;
            }
        }

        [HttpPost("InsertarProducto")]
        public ActionResult InsertarProducto([FromBody] ProductoCLS producto)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                if(producto.IdProducto == 0)
                {
                    Producto productoInsert = new Producto
                    {
                        Nombre = producto.Nombre,
                        Precio = producto.Precio,
                        Iidcategoria = producto.idCategoria,
                        Iidmarca = producto.IdMarca,
                        Stock = producto.Stock,
                        Bhabilitado = 1
                    };
                    context.Producto.Add(productoInsert);
                    context.SaveChanges();
                    return Ok();
                }
                else
                {
                    Producto productoEdit = context.Producto.Where(x => x.Bhabilitado == 1 && x.Iidproducto == producto.IdProducto).FirstOrDefault();
                    productoEdit.Nombre = producto.Nombre;
                    productoEdit.Precio = producto.Precio;
                    productoEdit.Iidcategoria = producto.idCategoria;
                    productoEdit.Iidmarca = producto.IdMarca;
                    productoEdit.Stock = producto.Stock;
                    context.SaveChanges();
                    return Ok();
                }
                
            }
        }

        [HttpGet("EliminarProducto/{idProducto}")]
        public ActionResult EliminarProducto(int idProducto)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                Producto productoEliminar = context.Producto.Where(x => x.Bhabilitado == 1 && x.Iidproducto == idProducto).FirstOrDefault();
                productoEliminar.Bhabilitado = 0;
                context.SaveChanges();
                return Ok();
            }
                
        }
    }
}