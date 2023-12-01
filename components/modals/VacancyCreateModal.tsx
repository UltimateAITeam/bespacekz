import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import VacancyForm from '../forms/VacancyForm';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const VacancyCreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoadingForm, setIsLoadingForm] = React.useState(false);
  const initialRef = React.useRef(null)
  const handleSubmit = async (data: any) => {
    setIsLoadingForm(true);
    console.log(data);
    // Handle the form submission here (e.g., send to an API)
    // submit the data to  /api/add_vacancy endpoint
    // then close the modal
    const resVacancyAPI = await fetch('/api/add_vacancy', {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (resVacancyAPI.ok) {
      const resVacancy = await resVacancyAPI.json();
      console.log(resVacancy);
    } else {
      console.log(resVacancyAPI.status);
    }
    onClose();
    setIsLoadingForm(false);
  };
  return (
    <Modal
      size={'xl'} 
      blockScrollOnMount={false} 
      onClose={onClose} 
      isOpen={isOpen} 
      isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Создать вакансию
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VacancyForm onSubmit={handleSubmit} onCloseModal={onClose} isLoadingButton={isLoadingForm}/>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose} mr={3}>Отмена</Button>
            <Button colorScheme="blue">
              Сохранить
            </Button>
          </ModalFooter> */}
        </ModalContent>
    </Modal>
  );
};

export default VacancyCreateModal;
