 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Restaurante.Clases;
using Restaurante.Models;
using Microsoft.AspNetCore.Mvc;
using Remotion.Linq.Clauses.ResultOperators;

namespace Restaurante.Controllers
{
    // [ApiController]
    [Route("Api/[Controller]")]
    [ApiController]
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("Listadopersonas")]
        //[Route("api/persona/Listadopersonas")]
        public IEnumerable<PersonaCLS> Listadopersonas()
        {
            using (BDRestauranteContext contex = new BDRestauranteContext())
            {
                List<PersonaCLS> listPersonas = (from persona in contex.Persona
                                                where persona.Bhabilitado == 1
                                                select new PersonaCLS { 
                                                IdPersona = persona.Iidpersona,
                                                NombreCompleto = persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno,
                                                FechaNacimiento = Convert.ToDateTime(persona.Fechanacimiento),
                                                Correo = persona.Correo,
                                                Telefono = persona.Telefono
                                                }).ToList();
                return listPersonas;
            }
        }

        [HttpGet("FiltradoPersona/{nombre?}")]
        //[Route("api/persona/FiltradoPersona/{nombre?}")]
        public IEnumerable<PersonaCLS> FiltradoPersona(string nombre = "")
        {
            using (BDRestauranteContext contex = new BDRestauranteContext())
            {
                if(string.IsNullOrEmpty(nombre))
                {
                    List<PersonaCLS> listPersonas = (from persona in contex.Persona
                                                     where persona.Bhabilitado == 1
                                                     select new PersonaCLS
                                                     {
                                                         IdPersona = persona.Iidpersona,
                                                         NombreCompleto = persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno,
                                                         FechaNacimiento = Convert.ToDateTime(persona.Fechanacimiento),
                                                         Correo = persona.Correo,
                                                         Telefono = persona.Telefono
                                                     }).ToList();
                    return listPersonas;
                }
                else
                {
                    List<PersonaCLS> listPersonas = (from persona in contex.Persona
                                                     where persona.Bhabilitado == 1
                                                     && (persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno).ToLower().Contains(nombre.ToLower())
                                                     select new PersonaCLS
                                                     {
                                                         IdPersona = persona.Iidpersona,
                                                         NombreCompleto = persona.Nombre + " " + persona.Apmaterno + " " + persona.Apmaterno,
                                                         FechaNacimiento = Convert.ToDateTime(persona.Fechanacimiento),
                                                         Correo = persona.Correo,
                                                         Telefono = persona.Telefono
                                                     }).ToList();
                    return listPersonas;
                }
                
            }
        }

        [HttpGet("EditarPersona/{idPersona}")]
        public PersonaCLS EditarPersona(int idPersona)
        {
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                PersonaCLS personaEdit = (from persona in context.Persona
                                         where persona.Iidpersona == idPersona
                                         && persona.Bhabilitado == 1
                                         select new PersonaCLS
                                         {
                                             IdPersona = persona.Iidpersona,
                                             Nombre = persona.Nombre,
                                             PrimerApellido = persona.Appaterno,
                                             SegundoApellido = persona.Apmaterno,
                                             Telefono = persona.Telefono,
                                             Correo = persona.Correo,
                                             FechaNacimientoEditar = ((DateTime)persona.Fechanacimiento).ToString("yyyy-MM-dd")
                                         }).FirstOrDefault();
                return personaEdit;

            }
        }

        [HttpPost("GuardarPersona")]
        //[Route("api/[controller]/GuardarPersona")]
        public ActionResult GuardarPersona([FromBody] PersonaCLS persona)
        {
            try
            {
                using (BDRestauranteContext context = new BDRestauranteContext())
                {
                    if(persona.IdPersona == 0)
                    {
                        Persona personaAdd = new Persona();
                        personaAdd.Nombre = persona.Nombre;
                        personaAdd.Appaterno = persona.PrimerApellido;
                        personaAdd.Apmaterno = persona.SegundoApellido;
                        personaAdd.Telefono = persona.Telefono;
                        personaAdd.Correo = persona.Correo;
                        personaAdd.Fechanacimiento = persona.FechaNacimiento;
                        personaAdd.Bhabilitado = 1;
                        personaAdd.Btieneusuario = 0;
                        context.Persona.Add(personaAdd);
                        context.SaveChanges();
                    }
                    else
                    {
                        Persona personaEdit = context.Persona.Where(x => x.Iidpersona == persona.IdPersona).FirstOrDefault();
                        personaEdit.Nombre = persona.Nombre;
                        personaEdit.Appaterno = persona.PrimerApellido;
                        personaEdit.Apmaterno = persona.SegundoApellido;
                        personaEdit.Telefono = persona.Telefono;
                        personaEdit.Correo = persona.Correo;
                        personaEdit.Fechanacimiento = persona.FechaNacimiento;
                        context.SaveChanges();
                    }
                    
                }
            }
            catch (Exception)
            {
                return BadRequest("A ocurrido un error inesperadp");
            }
            return Ok();
        }

        [HttpGet("EliminarPersona/{idPersona}")]
        public ActionResult EliminarPersona(int idPersona)
        {
            using(BDRestauranteContext context = new BDRestauranteContext())
            {
                Persona personaEliminar = context.Persona.Where(x => x.Iidpersona == idPersona).FirstOrDefault();
                if(personaEliminar.Iidpersona > 0)
                {
                    personaEliminar.Bhabilitado = 0;
                    context.SaveChanges();
                    return Ok();
                }else
                {
                    return BadRequest();
                }
                
            }
        }
        [HttpGet("ValidarEmail/{idPersona}/{correo}")]
        public int ValidarEmail(int idPersona, string correo)
        {
            int result = 0;
            using (BDRestauranteContext context = new BDRestauranteContext())
            {
                if(idPersona == 0)
                {
                    result = context.Persona.Where(x => x.Correo.ToUpper().Equals(correo.ToUpper())).Count();
                }
                return result;
            }
        }
    }
}