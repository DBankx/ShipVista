import React from 'react';
import { Box, Grid, Image, Heading, Text, Badge } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PlantDescription = ({ data }) => {
	const hours_watered_ago = dayjs().diff(dayjs(data.last_Watered_At), 'hours', true);

	return (
		<Box>
			<Grid templateColumns={{
				base: '1fr',
				md: '1fr 0.4fr',
				lg: '1fr 0.4fr'
			}} gap={6}>
				<Image src={data.photos[0]} alt={data.name} />
				<Image src={data.photos[1]} alt={data.name} />
			</Grid>
			<Box mt='2em'>
			<Text as='span' color='grey' display='block' fontSize='sm' fontWeight='semibold' mb='0'>Botanical Name</Text>
				<Heading mt='-1' size='md'>{data.botanical_Name}       { hours_watered_ago > 6 && <Badge ml="1" colorScheme="green">
        New
      </Badge> }
	  </Heading>
			</Box>
			<Box mt='1em'>
				<Text as='span' color='grey' display='block' fontSize='sm' fontWeight='semibold' mb='0'>Description</Text>
				<Text mt='-1'>{data.description}</Text>	
			</Box>
			<Box mt='1em'>
				<Text as='span' color='grey' display='block' fontSize='sm' fontWeight='semibold' mb='0'>Last time watered</Text>
				<Text mt='-1'>{dayjs(data.last_Watered_At).format('MMM DD YYYY')} at {dayjs(data.last_Watered_At).format('hh:mm:ss A')} OR {dayjs(data.last_Watered_At).fromNow()}</Text>	
			</Box>
		</Box>
	)
}

export default PlantDescription
