import React from 'react'
import { VStack, StackDivider, Grid, Box, Center, Text, Image, IconButton } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { removePlantFromWaterList } from '../../state/actions';

dayjs.extend(relativeTime);

const WaterList = ({ data }) => {
	const dispatch = useDispatch();
	return (
		<VStack
  divider={<StackDivider borderColor="gray.200" />}
  spacing={4}
  align="stretch"
>
{data.length > 0 ? (
	  data.map((plant) => (
		  <Grid alignItems='center' key={plant.id} templateColumns='1fr 2fr'>
		  	<Image src={plant.photos[0]} alt={plant.name} />
			  <Box>
				  <Text fontSize='md' fontWeight='semibold'>{plant.name}</Text>
				  <Text fontSize='sm' color='gray.500'>Last watered {dayjs(plant.last_Watered_At).fromNow()}</Text>
				  <IconButton onClick={() => 
					  dispatch(removePlantFromWaterList(plant.id))
				  } mt='.5em' size='sm' variant='ghost' icon={<DeleteIcon />}></IconButton>
			  </Box>
		  </Grid>
	  ))
) : (
	<Center h='150px'>
		<Text color='grey' fontWeight='bold'>No plants in the water list</Text>
	</Center>
)}
</VStack>
	)
}

export default WaterList
