import React from 'react';
import { Button, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import PlantDescription from './PlantDescription';
import { SunIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { waterPlantAsync, addPlantToWaterList, removePlantFromWaterList } from '../../state/actions';
import dayjs from 'dayjs';
import WaterPlantLoader from './WaterPlantLoader';
import axios from 'axios';

const PlantDescriptionModal = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { waterPlant, waterPlantList } = useSelector(state => state.app);
	const dispatch = useDispatch();
	const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
	const seconds_watered_ago = dayjs().diff(dayjs(data.last_Watered_At), 'seconds', true);
	const ct = axios.CancelToken.source();
	const isPlantInWaterList = waterPlantList.includes(data);
	return (
		<>
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.name} &bull; {data.size}FT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
		  	{waterPlant.isLoading ? <WaterPlantLoader data={data} ct={ct} /> : <PlantDescription data={data} /> }
          </ModalBody>

          <ModalFooter>

            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>

			{isPlantInWaterList ? <Button mr={3} onClick={() => {
				dispatch(removePlantFromWaterList(data.id));
			}} leftIcon={<MinusIcon />}>Remove from list</Button>  : <Button disabled={seconds_watered_ago < 30} mr={3} onClick={() => {
				dispatch(addPlantToWaterList(data));
			}} leftIcon={<AddIcon />}>Add to water list</Button> }

            <Button isLoading={waterPlant.isLoading} loadingText='Watering Plant...' disabled={isButtonDisabled || seconds_watered_ago < 30} onClick={() => {
				setIsButtonDisabled(true);
				dispatch(waterPlantAsync(data.id, ct.token));
				setTimeout(() => {
					setIsButtonDisabled(false);
				}, 30000);
			}} colorScheme='green' leftIcon={<SunIcon />}>Water plant</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
	)
}

export default PlantDescriptionModal
