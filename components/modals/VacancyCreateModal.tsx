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
  
  const initialRef = React.useRef(null)
  const handleSubmit = (data: any) => {
    console.log(data);
    // Handle the form submission here (e.g., send to an API)
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
            <VacancyForm onSubmit={handleSubmit} onCloseModal={onClose} />
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
