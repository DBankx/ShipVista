import types from './types';

const initialState = {
	plants: {
		isLoading: false,
		errors: null,
		data: []
	},
	plant: {
		isLoading: false,
		errors: null,
		data: null
	},
	waterPlant: {
		isLoading: false,
		errors: null,
		data: null
	},
	waterPlantList: [],
	waterMultiplePlants: {
		isLoading: false,
		errors: null,
		data: null
	}
};

const appReducer = (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case types.GET_ALL_PLANTS_START:
			return {
				...state,
				plants: {
					...state.plants,
					isLoading: true,
					errors: null
				}
			};
		case types.GET_ALL_PLANTS_SUCCESS:
			return {
				...state,
				plants: {
					...state.plants,
					isLoading: false,
					errors: null,
					data: payload
				}
			};
		case types.GET_ALL_PLANTS_FAILURE:
			return {
				...state,
				plants: {
					...state.plants,
					isLoading: false,
					errors: payload,
				}
			};
		case types.GET_PLANT_START:
			return {
				...state,
				plant: {
					...state.plant,
					isLoading: true,
				}
			};
		case types.GET_PLANT_SUCCESS:
			return {
				...state,
				plant: {
					...state.plant,
					isLoading: false,
					data: payload,
					errors: null
				}
			};
		case types.GET_PLANT_FAILURE:
			return {
				...state,
				plant: {
					...state.plant,
					isLoading: false,
					data: payload,
					errors: payload
				}
			};
		case types.WATER_PLANT_START:
			return {
				...state,
				waterPlant: {
					...state.waterPlant,
					isLoading: true,
				}
			};
		case types.WATER_PLANT_SUCCESS:
			const index = state.plants.data.findIndex(plant => plant.id === payload.id);
			const newPlants = [...state.plants.data];
			newPlants[index].last_Watered_At = new Date();
			return {
				...state,
				waterPlant: {
					...state.waterPlant,
					isLoading: false,
					data: payload,
				},
				plants: {
					...state.plants,
					data: newPlants
				}
			};
		case types.WATER_PLANT_FAILURE:
			return {
				...state,
				waterPlant: {
					...state.waterPlant,
					isLoading: false,
					errors: payload,
				}
			};
		case types.STOP_WATERING_PLANT:
			return {
				...state,
				waterPlant: {
					...state.waterPlant,
					isLoading: false,
					errors: null,
					data: null
				}
			};
		case types.ADD_PLANT_TO_WATER_LIST:
			return {
				...state,
				waterPlantList: [...state.waterPlantList, payload]
			}
		case types.REMOVE_PLANT_FROM_WATER_LIST:
			return {
				...state,
				waterPlantList: state.waterPlantList.filter(plant => plant.id !== payload.id)
			}
		case types.REMOVE_PLANTS_FROM_WATER_LIST:
			return {
				...state,
				waterPlantList: []
			}	
		case types.WATER_MULTIPLE_PLANTS_START:
			return {
				...state,
				waterMultiplePlants: {
					...state.waterMultiplePlants,
					isLoading: true,
				}
			}
		case types.WATER_MULTIPLE_PLANTS_SUCCESS:
			return {
				...state,
				waterMultiplePlants: {
					...state.waterMultiplePlants,
					isLoading: false,
					data: payload,
					errors: null
				}
			}
		case types.WATER_MULTIPLE_PLANTS_FAILURE:
			return {
				...state,
				waterMultiplePlants: {
					...state.waterMultiplePlants,
					isLoading: false,
					data: null,
					errors: payload
				}
			}												
		default:
			return state;	
	}

};

export default appReducer;