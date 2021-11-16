import React from 'react'
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import types from '../../state/types';

const WaterPlantLoader = ({ data, ct }) => {
	const dispatch = useDispatch();
	return (
		<Box textAlign='center'>
			<Image src={data.photos[0]} alt={data.name} />
			<Text mt='1em' fontSize='lg' fontWeight='semibold'>Watering {data.name}...</Text>
			<Button onClick={() => {
				ct.cancel();
				dispatch({ type: types.STOP_WATERING_PLANT });
				}} colorScheme='red' mt='1em' leftIcon={<CloseIcon />}>Stop Watering Plant</Button>
		</Box>
	)
}

export default WaterPlantLoader
