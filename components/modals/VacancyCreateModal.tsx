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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  IconButton,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react'
import VacancyForm from '../forms/VacancyForm';
import { useToast } from '@chakra-ui/react'
import { BsStars } from "react-icons/bs";
import { BiSend } from "react-icons/bi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const VacancyCreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoadingForm, setIsLoadingForm] = React.useState(false);
  const initialRef = React.useRef(null)
  const toast = useToast()

  const [aiPrompt, setAIPrompt] = React.useState('');
  const [aiResponse, setAIResponse] = React.useState('');
  const [isLoadingAIDescription, setIsLoadingAIDescription] = React.useState(false);

  // Handle change in AI prompt input
  const handleAIPromptChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setAIPrompt(e.target.value);
  };

  // Handle submission to OpenAI API
  const handleAISubmit = async () => {
    try {
      setIsLoadingAIDescription(true);
      const response = await fetch('api/generate_ai_vacancy_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        setIsLoadingAIDescription(false);
      }
      const data = await response.json();
      setAIResponse(data.generatedText);
      setIsLoadingAIDescription(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: "Failed to generate description.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoadingAIDescription(false);
    }
  };

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
      // console.log(resVacancy);
      toast({
        title: 'Вакансия создана.',
        description: "Ваша вакансия успешно создана и теперь доступна кандидатам.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    } else {
      console.log(resVacancyAPI.status);
      toast({
        title: 'Ошибка при создании вакансии.',
        description: "Пожалуйста, попробуйте еще раз.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
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
            <Flex className='items-center gap-6 w-full'>
              Создать вакансию
              <Popover>
              <PopoverTrigger>
                <Button leftIcon={<BsStars />} colorScheme='pink' size='sm'>Ask AI</Button>
              </PopoverTrigger>
              <PopoverContent className='md:min-w-[510px]'>
                <PopoverArrow />
                {/* <PopoverCloseButton /> */}
                {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                <PopoverBody className='text-md'>
                  <Flex className='items-center gap-2'>
                    <BsStars />
                    <Input
                      value={aiPrompt}
                      onChange={handleAIPromptChange} 
                      variant='unstyled' 
                      placeholder='Ask AI to generate vacancy description...'
                      size='sm'
                      borderColor="transparent"
                      focusBorderColor="transparent"
                      _placeholder={{ color: 'gray.400', fontSize: 'sm' }}
                      _focus={{ border: 'none', boxShadow: 'none' }} // Remove border and boxShadow on focus
                      _hover={{ border: 'none' }} // Remove border on hover
                      _active={{ border: 'none' }} // Remove border on active
                      />
                    <IconButton aria-label='Send to AI' icon={<BiSend />} onClick={handleAISubmit}/>
                  </Flex>
                  {aiResponse && aiResponse !== '' && (
                    <div className='pt-4'>
                    <Box className='p-5 bg-gradient-to-tr from-[#CCFBF1] to-[#CFFAFE] rounded-lg shadow-md'>
                      <Text className='text-sm font-semibold'>
                        AI Response:
                      </Text>
                      <Text className='text-[1rem] font-normal'>
                        {aiResponse}
                      </Text>
                    </Box>
                    </div>
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
            </Flex>
            
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
