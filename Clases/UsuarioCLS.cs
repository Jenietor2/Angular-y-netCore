using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Clases
{
    public class UsuarioCLS
    {
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public string NombrePersona { get; set; }
        public int Habilitado { get; set; }
        public string TipoUsuario { get; set; }
    }
}
