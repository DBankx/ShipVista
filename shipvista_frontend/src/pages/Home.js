import React, {useState, useEffect} from 'react';
import { Box, Text } from '@chakra-ui/layout';
import PlantList from '../components/plants/PlantList';
import dayjs from 'dayjs';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';

const Home = () => {
	const [dateState, setDateState] = useState(new Date());
	useEffect(() => {
      setInterval(() => setDateState(new Date()), 1000);
    }, []);
	return (
		<Box color='#000'>
			<Box mb='2em' textAlign='center'>
				<Text><CalendarIcon /> {dayjs(dateState).format('MMM DD YYYY')} {' '} &bull; {' '} <TimeIcon /> {dayjs(dateState).format('hh:mm:ss A')}</Text>
			</Box>
			<PlantList />	
		</Box>
	)
}

export default Home;