import types from './types';
import {plantRequests} from '../adapters/api/agent';
import { toast } from 'react-toastify';

export const getAllPlantsAsync = () => {
	return async dispatch => {
		dispatch({
			type: types.GET_ALL_PLANTS_START
		});

		try {
			const plants = await plantRequests.getAllPlants();
			dispatch({
				type: types.GET_ALL_PLANTS_SUCCESS,
				payload: plants
			});
		} catch (error) {
			dispatch({
				type: types.GET_ALL_PLANTS_FAILURE,
				payload: error
			});
			toast.error(error.data);
			throw error;
		}
	}
}

export const getPlantAsync = (id, ct) => {
	return async dispatch => {
		dispatch({
			type: types.GET_PLANT_START
		});

		try {
			const plant = await plantRequests.getPlant(id, ct);
			dispatch({
				type: types.GET_PLANT_SUCCESS,
				payload: plant
			});
		} catch (error) {
			dispatch({
				type: types.GET_PLANT_FAILURE,
				payload: error
			});
			toast.error(error.data);
			throw error;
		}
	}	
}

export const waterPlantAsync = (id, ct) => {
	return async dispatch => {
		dispatch({
			type: types.WATER_PLANT_START
		});

		try {
			await plantRequests.waterPlant(id, ct);
			dispatch({
				type: types.WATER_PLANT_SUCCESS,
				payload: { id }
			});
			toast.success('Plant watered successfully!');
		} catch (error) {
			dispatch({
				type: types.WATER_PLANT_FAILURE,
				payload: error
			});
			toast.error(error.data);
			throw error;
		}
	}		
}

export const addPlantToWaterList = (plant) => {
	return async dispatch => {
		dispatch({
			type: types.ADD_PLANT_TO_WATER_LIST,
			payload: plant
		});
	}
}

export const removePlantFromWaterList = (id) => {
	return async dispatch => {
		dispatch({
			type: types.REMOVE_PLANT_FROM_WATER_LIST,
			payload: { id }
		});
	}
}

export const waterMultiplePlantsAsync = (ids, ct) => {
	return async dispatch => {
		dispatch({
			type: types.WATER_MULTIPLE_PLANTS_START
		});

		try {
			await plantRequests.waterMultiplePlants(ids, ct);
			dispatch({
				type: types.WATER_MULTIPLE_PLANTS_SUCCESS,
				payload: ids
			});
			dispatch({
				type: types.REMOVE_PLANTS_FROM_WATER_LIST,
			})
			toast.success('Plants watered successfully!');
		} catch (error) {
			dispatch({
				type: types.WATER_MULTIPLE_PLANTS_FAILURE,
				payload: error
			});
			toast.error(error.data);
			throw error;
		}
	}
}