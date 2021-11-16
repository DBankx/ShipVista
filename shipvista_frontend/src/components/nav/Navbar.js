import React from 'react'
import { HStack, Image,  Container, Badge, Popover, PopoverArrow, Button, PopoverTrigger, Portal, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverCloseButton } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import WaterList from '../plants/WaterList';
import { waterMultiplePlantsAsync } from '../../state/actions';
import axios from 'axios';

const Navbar = () => {
	const {waterPlantList, waterMultiplePlants} = useSelector(state => state.app);
	const dispatch = useDispatch();
	const ct = axios.CancelToken.source();
	return (
		<nav className='navigation'>
		<Container maxW='container.xl'>
			<HStack justifyContent='space-between' alignItems='center' py='.5em'>
				{/* <Heading color='green' as={Link} to='/' >Shipvista</Heading> */}
				<Image src='https://shipvista.com/assets/img/ShipvistaNewLogo.png' width='200px' height='50px' alt='logo' />

				<HStack spacing={6}>
				
				<Popover>
  <PopoverTrigger>
    <Button variant='ghost' rightIcon={<Badge variant='subtle' colorScheme='green'>{waterPlantList.length}</Badge>}>Water List</Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Plants to water</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
	  <WaterList data={waterPlantList} />
      </PopoverBody>
      <PopoverFooter>
		<Button isLoading={waterMultiplePlants.isLoading} loadingText='Watering plants...' onClick={() => {
			dispatch(waterMultiplePlantsAsync(waterPlantList.map(plant => plant.id), ct.token))
		}} disabled={waterPlantList.length <= 0} colorScheme='green'>Water All</Button>
	  </PopoverFooter>
    </PopoverContent>
  </Portal>
</Popover>
				</HStack>
			</HStack>
</Container>
		</nav>
	)
}

export default Navbar
