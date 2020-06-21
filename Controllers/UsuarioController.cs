using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurante.Clases;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Restaurante.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Usuario/ListarTiposUsuarios")]
        public IEnumerable<TipoUsuarioCLS> ListarTiposUsuarios()
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                List<TipoUsuarioCLS> listTiposUsuario = (from tiposUsuario in context.TipoUsuario
                                                         where tiposUsuario.Bhabilitado == 1
                                                         select new TipoUsuarioCLS
                                                         {
                                                             Description = tiposUsuario.Descripcion,
                                                             IdTipoUsuario = tiposUsuario.Iidtipousuario,
                                                             Nombre = tiposUsuario.Nombre
                                                         }).ToList();
                return listTiposUsuario;
            }

        }

        [HttpGet]
        [Route("api/Usuario/ListarUsuarios")]
        public IEnumerable<UsuarioCLS> ListarUsuarios()
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                List<UsuarioCLS> listUsuarios = (from usuario in context.Usuario
                                                 join persona in context.Persona
                                                 on usuario.Iidpersona equals persona.Iidpersona
                                                 join tipoUsuario in context.TipoUsuario
                                                 on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                         where usuario.Bhabilitado == 1
                                                         select new UsuarioCLS
                                                         {
                                                             IdUsuario = usuario.Iidusuario,
                                                             TipoUsuario = tipoUsuario.Nombre,
                                                             NombreUsuario = usuario.Nombreusuario,
                                                             NombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno
                                                         }).ToList();
                return listUsuarios;
            }

        }

        [HttpGet]
        [Route("api/usuario/FiltrarUsuarioXTipo/{idTipoUsuario?}")]
        public IEnumerable<UsuarioCLS> FiltrarUsuarioXTipo(int idTipoUsuario = 1)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                List<UsuarioCLS> listaUsuarios = (from usuario in context.Usuario
                                                  join persona in context.Persona
                                                  on usuario.Iidpersona equals persona.Iidpersona
                                                  join tipoUsuario in context.TipoUsuario
                                                  on usuario.Iidtipousuario equals tipoUsuario.Iidtipousuario
                                                  where usuario.Bhabilitado == 1
                                                  && tipoUsuario.Iidtipousuario == idTipoUsuario
                                                  select new UsuarioCLS
                                                  {
                                                      IdUsuario = usuario.Iidusuario,
                                                      NombrePersona = persona.Nombre + " " + persona.Appaterno + " " + persona.Apmaterno,
                                                      NombreUsuario = usuario.Nombreusuario,
                                                      TipoUsuario = tipoUsuario.Nombre
                                                  }).ToList();
                return listaUsuarios;
            }
        }
    }
    
}