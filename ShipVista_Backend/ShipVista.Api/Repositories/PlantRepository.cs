using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShipVista.Api.Models;
using ShipVista.Api.Persistance;

namespace ShipVista.Api.Repositories
{
    public class PlantRepository : IPlantRepository
    {
        public List<Plant> plants = new List<Plant>() {
            new Plant{
                Id = 1,
                Name = "Devil’s Ivy",
                Botanical_Name = "Epipremnum aureum",
                Description = "Devil’s Ivy (Epipremnum aureum), also known as Pothos (although that is actually a different plant) and is a type of evergreen vine. The leaves are large and sometimes heart-shaped and come in a wide variety of light and dark colors.This species adapts well to a variety of office conditions, from low light levels to brighter ones. This easy-to-care-for plant with heart-shaped, white-splotched leaves makes a lovely addition sitting on a desk, shelf or table. Larger specimens, trained around a pole or cane, look great in big pots on the floor.",
                Photos = new List<string>{
                    "https://www.ambius.com/blog/wp-content/uploads/2018/06/devilsivy-1-e1529597998709.jpg",
                    "https://s3.amazonaws.com/eit-planttoolbox-prod/media/images/Epipremnum_aureum_madaise_ccbyncnd2.0.jpg"
                },
                Size = 7,
                Last_Watered_At = DateTime.UtcNow
            },
            new Plant{
                Id = 2,
                Name = "Chinese Evergreen",
                Botanical_Name = "Aglaonema",
                Description = "Sometimes just called “aglos” or Chinese evergreens, Aglaonema are popular because of the color of the leaves. While many develop deep green leaves, they can also have traces of silver or red. The scientific name is derived from two Greek words; ‘aglaos’ meaning bright and ‘nama’ a filament or thread, referring to the striking stamens produced within the flowers. It is a popular plant with the Chinese, to whom it symbolizes long life (hence “Chinese evergreen”).",
                Photos = new List<string>{
                    "https://www.ambius.com/blog/wp-content/uploads/2018/06/main_aglaonema-silver-bay.jpg",
                    "https://cdn.shopify.com/s/files/1/1941/1701/products/Aglaonema_Osaka_530x_2x_1b255eaa-204b-487f-827a-0db1de2655b2_1047x.jpg?v=1545160349"
                },
                Size = 3,
                Last_Watered_At = DateTime.UtcNow
            },
            new Plant{
                Id = 3,
                Name = "Weeping Fig",
                Botanical_Name = "Ficus Benjamina",
                Description = "Commonly knows as the weeping fig, Ficus benjamina is a versatile plant which looks attractive as a stand-alone specimen or as part of a mixed display. Ficus benjamina grows wild in the tropical forests of India, Southeast Asia and Northern Australia and derives its name from an Indian acme Ben-ja. Young plants often develop from seeds lodged in the branches of other trees, soon producing aerial roots which reach down to the ground. Gradually the ficus surrounds the host trunk and in time fuse together to strangle the tree. Cold drafts from windows or doors will harm them, so make sure to place them somewhere where drafts will not be an issue.",
                Photos = new List<string>{
                    "https://www.ambius.com/blog/wp-content/uploads/2018/06/main_ficus-benjamina-species.jpg",
                    "https://www.thespruce.com/thmb/3OWGHz93bik9LksoL8Ak6KvpBOo=/1928x1928/smart/filters:no_upscale()/grow-ficus-trees-1902757-1-80b8738caf8f42f28a24af94c3d4f314.jpg"
                },
                Size = 4,
                Last_Watered_At = DateTime.UtcNow
            },
            new Plant{
                Id = 4,
                Name = "ZZ Plant",
                Botanical_Name = "Zamioculcas Zamiifolia",
                Description = "Commonly abbreviated as the ZZ plant, its complicated-to-pronounce name isn’t indicative of how hard they are to maintain. Their fat stalks and bulging roots store a huge amount of water, which means you don’t have to search around the office for a watering can every day. A favorite for people who are guilty of killing their plants, the ZZ plant can also tolerate prolonged periods of low light. This makes it the perfect candidate for a desk plant since the winter season can be quite dark. You might think this all sounds great, but it gets better. The ZZ plant needs little in the way of fertilizer and gets very few pests. It’s nearly a hassle-free plant!",
                Photos = new List<string>{
                    "https://www.ambius.com/blog/wp-content/uploads/2018/06/main_low-light-zamioculcas-zamiifolia.jpg",
                    "https://d2j6dbq0eux0bg.cloudfront.net/images/24984349/1304824772.jpg"
                },
                Size = 2,
                Last_Watered_At = DateTime.UtcNow
            },
            new Plant
            {
                Id = 5,
                Name = "Bromeliads",
                Botanical_Name = "Bromeliads",
                Description = "Perfect for reception areas or dotted along corridors, Bromeliads may require a bit more maintenance at first in order to bloom, as they are notorious for taking their time. But once they bloom, aside from the occasional watering, they require very little care. One of the main reasons for this is that they don’t require much fertilizer, meaning all you need is water and someone to look at them once in a while. With their striking colors and beautiful blooms, this won’t be hard.",
                Photos = new List<string>
                {
                    "https://www.ambius.com/blog/wp-content/uploads/2018/06/main_bromiliead-bowl.jpg",
                    "https://images.immediate.co.uk/production/volatile/sites/10/2019/04/2048x1365-Bromeliad-GettyImages-950489110-01dfea1.jpg?quality=90&resize=960%2C640"
                },
                Size = 6,
                Last_Watered_At = DateTime.UtcNow
            }
        };

        public PlantRepository()
        {
           
        }

        public Plant CreatePlant(Plant plant)
        {
            plants.Add(plant);
            return plant;
        }

        public void DeletePlant(int id)
        {
            var plant = GetPlantById(id);
            plants.Remove(plant);
        }

        public IEnumerable<Plant> GetAllPlants()
        {
            return plants;
        }

        public Plant GetPlantById(int id)
        {
            return plants.Find(x => x.Id == id);
        }

        public void UpdatePlant(Plant plant)
        {
            var plantToUpdate = plants.Find(x => x.Id == plant.Id);
            plantToUpdate = plant;
        }
    }
}
