using System;
using System.Collections.Generic;

namespace ShipVista.Api.Models
{
    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Botanical_Name { get; set; }
        public List<string> Photos { get; set; }
        public string Description { get; set; }
        public int Size { get; set; }
        public DateTime Last_Watered_At { get; set; }
    }
}
