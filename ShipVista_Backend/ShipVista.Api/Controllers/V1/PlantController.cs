using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShipVista.Api.Models;
using ShipVista.Api.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShipVista.Api.Controllers.V1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly IPlantRepository _plantRepository;

        public PlantController(IPlantRepository plantRepository)
        {
            _plantRepository = plantRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Plant>> GetBooks()
        {
            return Ok(_plantRepository.GetAllPlants());
        }

        [HttpGet("{id}")]
        public ActionResult<Plant> GetPlant(int id)
        {
            var plant = _plantRepository.GetPlantById(id);

            if (plant is null)
            {
                return NotFound(string.Format("Plant with id {0} is not found", id));
            }

            return Ok(plant);
        }

        [HttpPut("water/{id}")]
        public ActionResult WaterPlant(int id, CancellationToken ct)
        {
            var plantBeingWatered = _plantRepository.GetPlantById(id);
          
            if(plantBeingWatered is null)
            {
                return NotFound(String.Format("Plant with id {0} not found", id));
            }

            if((DateTime.UtcNow - plantBeingWatered.Last_Watered_At).TotalSeconds < 30)
            {
                return BadRequest("Plant has already been watered in a 30s timeframe. Please wait..");
            }

            Thread.Sleep(10000);

            if (ct.IsCancellationRequested)
            {
                return Ok("You stopped watering plant");
            }

            plantBeingWatered.Last_Watered_At = DateTime.UtcNow;

            _plantRepository.UpdatePlant(plantBeingWatered);

            return Ok("Plant watered successfully");
            
        }

        //TODO --> make this work!

        [HttpPut("water-multiple")]
        public ActionResult WaterMultiplePlants([FromQuery] int[] plantIds, CancellationToken ct)
        {
            List<Plant> plantsBeingWatered;

            var timeFramePassed = false;

            Thread.Sleep(10000);

            for(int i = 0; i < plantIds.Length; i++)
            {
                var plant = _plantRepository.GetPlantById(plantIds[i]);

                if ((DateTime.UtcNow - plant.Last_Watered_At).TotalSeconds > 30)
                {
                    plant.Last_Watered_At = DateTime.UtcNow;
                    _plantRepository.UpdatePlant(plant);
                    timeFramePassed = true;
                    
                } else
                {
                    timeFramePassed = false;
                }
            };

            if(timeFramePassed == false)
            {
                return BadRequest("A plants watering timeframe hasnt passed 30s. Please make sure all plants timeframe are below 30s");

            } else
            {
                return Ok("All plants have been watered");
            }

        }

    }
}
