using System;
using Microsoft.EntityFrameworkCore;
using ShipVista.Api.Models;

namespace ShipVista.Api.Persistance
{
    // NOT USED

    public class PlantContext : DbContext
    {
        public PlantContext(DbContextOptions<PlantContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Plant> Plants { get; set; }
    }
}
