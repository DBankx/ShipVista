import axios from 'axios';
import { toast } from 'react-toastify';
import * as qs from 'query-string';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// set-up axios interceptors for error handling
axios.interceptors.response.use(undefined, error => {
	if(error.message === 'Network Error' && !error.response) {
		console.log('Network error');
		toast.error('Network Error - Check your connection');
		throw error;
	}
	 // redirect to notfound page for bad guids
  if (error.response.status === 404) {
    console.error('Resource was not found', 'AXIOS INTERCEPTOR');
  }
  if (error.response.status === 400 && error.response.config.method === 'get') {
    console.error('Resource was not found', 'AXIOS INTERCEPTOR');
  }
  // send a toast notification if any response is a 500 status code
  if (error.response.status === 500) {
    console.error('Server Error', 'AXIOS INTERCEPTOR');
	toast.error('Server Error Occurred');
  }
  throw error.response;
});

const responseBody = (response) => response.data;

const ApiRequest = {
	get: (url, config,) => axios.get(url, config).then(responseBody),
	post: (url, body, config) => axios.post(url, body, config).then(responseBody),
	put: (url, body, config) => axios.put(url, body, config).then(responseBody),
	delete: (url, config) => axios.delete(url, config).then(responseBody)
}


export const plantRequests = {
	getAllPlants: (ct) => ApiRequest.get('/plant', { cancelToken: ct}),
	getPlant: (id, ct) => ApiRequest.get(`/plant/${id}`, { cancelToken: ct}),
	waterPlant: (id, ct) => ApiRequest.put(`/plant/water/${id}`, {}, { cancelToken: ct}),
	waterMultiplePlants: (ids, ct) => ApiRequest.put(`/plant/water-multiple`, {}, {
		cancelToken: ct,
		params: {
			plantIds: ids
		},
		paramsSerializer: params => {
			return qs.stringify(params);
		}
	}),
}