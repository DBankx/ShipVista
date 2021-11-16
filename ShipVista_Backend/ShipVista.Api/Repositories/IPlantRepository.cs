using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShipVista.Api.Models;

namespace ShipVista.Api.Repositories
{
    public interface IPlantRepository
    {
        // Get all plants
        IEnumerable<Plant> GetAllPlants();
        // Get plant with id
        Plant GetPlantById(int id);
        // Create a plant
        Plant CreatePlant(Plant plant);
        // Update a plant
        void UpdatePlant(Plant plant);
        // Delete plant
        void DeletePlant(int id);
    }
}
