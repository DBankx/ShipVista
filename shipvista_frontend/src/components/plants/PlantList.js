import { Grid, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlantsAsync } from '../../state/actions';
import PlantItem from './PlantItem';

const PlantList = () => {

	const dispatch = useDispatch();
	const { plants: {
		isLoading,
		data,
	}} = useSelector(state => state.app);

	useEffect(() => {
		dispatch(getAllPlantsAsync());
	}, [ dispatch ]);

	if (isLoading) {
		return <Spinner size='lg' />
	}

	return (
		<Grid templateColumns={{
			base: 'repeat(1, 1fr)',
			xl: 'repeat(3, 1fr)',
			md: 'repeat(2, 1fr)',
		}} gap={6}>
			{data.length > 0 && data.map(plant => (
				<PlantItem data={plant} key={plant.id} />
			))}
		</Grid>
	)
}

export default PlantList
