import React from 'react'
import { Box, Image, Heading, Text, Divider, HStack, Badge } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import PlantDescriptionModal from './PlantDescriptionModal';

const PlantItem = ({
	data
}) => {
	const hours_watered_ago = dayjs().diff(dayjs(data.last_Watered_At), 'hours', true);

	return (
		<Box as={Link} to='/' _hover={{
			borderColor: 'green',
			h2: {
				color: 'green'
			}
		}} maxW='sm' borderWidth='1px' borderRadius="lg" overflow="hidden">
			<Image src={data.photos[0]} alt={data.name} />
			
			<Box p='6'>
			<Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {data.botanical_Name} &bull; {data.size}ft (size)
          </Box>
		  	<HStack>
				<Heading size='md'>{data.name}</Heading>
				{hours_watered_ago > 6 && (
					      <Badge ml="1" colorScheme="red">
        				Dry
      					</Badge>		
				)}
			</HStack>
				<Text w='100%' noOfLines={3} mt='1.2em'>
					{data.description}
				</Text>
				<HStack mt='2em' justifyContent='flex-end' w='100%' alignItems='center'>
				<PlantDescriptionModal data={data} />
				</HStack>
				<Divider mt='2em' />
				<Text as='' mt='1em'>
					Last Watered: <Text as='b'>{dayjs(data.last_Watered_At).format('MMM D YYYY @ hh:mm:s A')}</Text>
				</Text>
			</Box>
		</Box>
	)
}

export default PlantItem
