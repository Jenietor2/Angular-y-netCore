﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Restaurante.Clases;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Transactions;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Pagina = Restaurante.Clases.Pagina;

namespace Restaurante.Controllers
{

    [Route("Api/[Controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("ListarTiposUsuarios")]
        //[Route("api/Usuario/ListarTiposUsuarios")]
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

        [HttpGet("ListarUsuarios")]
        //[Route("api/Usuario/ListarUsuarios")]
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

        [HttpGet("FiltrarUsuarioXTipo/{idTipoUsuario?}")]
        //[Route("api/usuario/FiltrarUsuarioXTipo/{idTipoUsuario?}")]
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
        [HttpGet("ValidarUsuario/{idUsuario}/{nombreUsuario}")]
        public int ValidarUsuario(int idUsuario, string nombreUsuario)
        {
            int result = 0;
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                if (idUsuario == 0)
                {
                    result = context.Usuario.Where(x => x.Nombreusuario.ToUpper().Equals(nombreUsuario.ToUpper())).Count();
                }
                else
                {
                    result = context.Usuario.Where(x => x.Iidusuario != idUsuario && x.Nombreusuario.ToUpper().Equals(nombreUsuario.ToUpper())).Count();
                }
                return result;
            }
        }
        [HttpGet("EditarUsuarioPorId/{idUsuario}")]
        public UsuarioCLS EditarUsuarioPorId(int idUsuario)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                UsuarioCLS usuarioEdit = (from usuario in context.Usuario
                                          where usuario.Bhabilitado == 1
                                          && usuario.Iidusuario == idUsuario
                                          select new UsuarioCLS
                                          {
                                              IdUsuario = usuario.Iidusuario,
                                              NombreUsuario = usuario.Nombreusuario,
                                              IdTipoUsuario = (int)usuario.Iidtipousuario
                                          }).FirstOrDefault();
                return usuarioEdit;
            }
        }
        [HttpPost("InsertarUsuario")]
        public ActionResult InsertarUsuario([FromBody] UsuarioCLS usuario)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                using (var transaccion = new TransactionScope())
                {
                    if (usuario.IdUsuario == 0)
                    {
                        //Se encripta la contraseña
                        SHA256Managed sha = new SHA256Managed();
                        string password = usuario.password;
                        byte[] dataNocifrada = Encoding.Default.GetBytes(password);
                        byte[] dataCifrada = sha.ComputeHash(dataNocifrada);
                        string passwordEncriptado = BitConverter.ToString(dataCifrada).Replace("-", ""); 
                        Usuario usuarioinsert = new Usuario
                        {
                            Bhabilitado = 1,
                            Nombreusuario = usuario.NombreUsuario,
                            Iidtipousuario = usuario.IdTipoUsuario,
                            Iidpersona = Convert.ToInt32(usuario.IdPersona),

                            Contra = passwordEncriptado
                        };
                        Persona persona = context.Persona.Where(x => x.Iidpersona == usuario.IdPersona).FirstOrDefault();
                        persona.Btieneusuario = 1;
                        context.Usuario.Add(usuarioinsert);
                        context.SaveChanges();
                        transaccion.Complete();
                    }
                    else
                    {
                        Usuario usuarioEdit = context.Usuario.Where(x => x.Iidusuario == usuario.IdUsuario).FirstOrDefault();
                        usuarioEdit.Nombreusuario = usuario.NombreUsuario;
                        usuarioEdit.Iidtipousuario = usuario.IdTipoUsuario;
                        context.SaveChanges();
                        transaccion.Complete();
                    }
                    return Ok();
                }

            }
        }
        [HttpGet("EliminarUsuario/{idUsuario}")]
        public ActionResult EliminarUsuario(int idUsuario)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                if (idUsuario > 0)
                {
                    Usuario usuarioEliminar = context.Usuario.Where(x => x.Iidusuario == idUsuario).FirstOrDefault();
                    usuarioEliminar.Bhabilitado = 0;
                    context.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
        }

        [HttpPost("Login")]
        public UsuarioCLS Login([FromBody] UsuarioCLS usuario)
        {
            int result = 0;
            UsuarioCLS usuarioReturn = new UsuarioCLS();
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                //Se encripta la contraseña recibida 
                
                SHA256Managed sha = new SHA256Managed();
                byte[] dataNocifrada = Encoding.Default.GetBytes(usuario.password);
                byte[] dataCifrada = sha.ComputeHash(dataNocifrada);
                string passwordEncriptado = BitConverter.ToString(dataCifrada).Replace("-", "");
                result = context.Usuario.Where(x => x.Nombreusuario.ToLower().Equals(usuario.NombreUsuario.ToLower()) && x.Contra.Equals(passwordEncriptado)).Count();
                if(result == 1)
                {
                    Usuario user = context.Usuario.Where(x => x.Nombreusuario.ToLower().Equals(usuario.NombreUsuario.ToLower()) && x.Contra.Equals(passwordEncriptado)).FirstOrDefault();
                    HttpContext.Session.SetString("usuario", user.Iidusuario.ToString());
                    HttpContext.Session.SetString("tipoUsuario", user.Iidtipousuario.ToString());
                    usuarioReturn.IdUsuario = user.Iidusuario;
                    usuarioReturn.NombreUsuario = user.Nombreusuario;
                }else
                {
                    usuarioReturn.IdUsuario = 0;
                    usuarioReturn.NombreUsuario = "";
                }
            }
            return usuarioReturn;
        }

        [HttpGet("GetSession")]
        public SeguridadCLS GetSession()
        {
            SeguridadCLS seguridad = new SeguridadCLS();
            string session = HttpContext.Session.GetString("usuario");
            if (session == null)
            {
                seguridad.Valor = "";
            }
            else
            {
                seguridad.Valor = HttpContext.Session.GetString("usuario");
            }
            return seguridad;
        }

        [HttpGet("CerrarSesion")]
        public SeguridadCLS CerrarSesion()
        {
            SeguridadCLS seguridadSesion = new SeguridadCLS();
            try
            {
                HttpContext.Session.Remove("usuario");
                HttpContext.Session.Remove("tipoUsuario");
                seguridadSesion.Valor = "ok";
            }
            catch (Exception)
            {
                seguridadSesion.Valor = "";
            }
            return seguridadSesion;

        }

        [HttpGet("ListarPagina")]
        public List<Pagina> ListarPagina()
        {
            List<Pagina> lstPaginas = new List<Pagina>();
            int idTipoUsuario = int.Parse(HttpContext.Session.GetString("tipoUsuario"));
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                lstPaginas = (from paginaTipo in context.PaginaTipoUsuario
                              join pagina in context.Pagina
                              on paginaTipo.Iidpagina equals pagina.Iidpagina
                              where paginaTipo.Bhabilitado == 1
                              && paginaTipo.Iidtipousuario == idTipoUsuario
                              select new Pagina
                              {
                                  IdPagina = pagina.Iidpagina,
                                  Mensaje = pagina.Mensaje,
                                  Accion = pagina.Accion,
                                  Habilitado = (int)pagina.Bhabilitado
                              }).ToList();
                return lstPaginas;
            }

        }
    }
}