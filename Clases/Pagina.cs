using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurante.Clases
{
    public class Pagina
    {
        public int IdPagina { get; set; }
        public string Mensaje { get; set; }
        public string Accion { get; set; }
        public int Habilitado { get; set; }
    }
}
