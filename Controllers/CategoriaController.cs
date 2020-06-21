using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;
using Restaurante.Clases;

namespace Restaurante.Controllers
{
    public class CategoriaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/Categoria/listarCategoria")]
        public IEnumerable<CategoriaCLS> ListarCategorias()
        {
            using (var db = new BDRestauranteContext())
            {
                List<CategoriaCLS> listaCategoria = (from categoria in db.Categoria
                                                    where categoria.Bhabilitado == 1
                                                    select new CategoriaCLS {
                                                        IdCategoria = categoria.Iidcategoria,
                                                        Nombre = categoria.Nombre
                                                    }).ToList();
                return listaCategoria;
            }
        }
    }
}