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
  Spacer,
} from '@chakra-ui/react'
import VacancyForm from '../forms/VacancyForm';
import { useToast } from '@chakra-ui/react'
import { BsStars } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { useChat } from 'ai/react';
import { MemoizedReactMarkdown } from '../../components/ui/markdown'
import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

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

  const { messages, input, handleInputChange, handleSubmit: handleSubmitChat } = useChat();

  return (
    <Modal
      size={'2xl'} 
      blockScrollOnMount={false} 
      onClose={onClose} 
      isOpen={isOpen} 
      isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex className='items-center gap-20 w-full'>
              Создать вакансию
              <Popover>
              <PopoverTrigger>
                <Button leftIcon={<BsStars />} colorScheme='pink' size='sm'>Ask AI</Button>
              </PopoverTrigger>
              <PopoverContent className='md:min-w-[800px]'>
                <PopoverArrow />
                {/* <PopoverCloseButton /> */}
                {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                <PopoverBody className='text-md'>
                  
                  <form onSubmit={handleSubmitChat}>
                  <Flex className='items-center gap-2'>
                    <BsStars />
                    <Input
                      value={input}
                      onChange={handleInputChange} 
                      variant='unstyled' 
                      placeholder='Ask AI to generate vacancy description...'
                      size='sm'
                      borderColor="transparent"
                      border={0}
                      fontWeight={400}
                      _placeholder={{ color: 'gray.400', fontSize: 'sm', fontWeight: 'normal' }}
                      _focus={{ border: 'none', boxShadow: 'none', outline: 'none' }} // Remove border, boxShadow, and outline on focus
                      _hover={{ border: 'none' }} // Remove border on hover
                      _active={{ border: 'none' }} // Remove border on active
                      />
                    <IconButton aria-label='Send to AI' icon={<BiSend />} type='submit'/>
                    </Flex>
                    </form>
                  
                  {messages.slice(-2).map(message => (

                   
                    <div key={message.id} className='pt-4 pb-4'>
                    <Box key={message.id + 'box'} className={`p-5 bg-gradient-to-tr ${message.role == 'assistant' ? 'from-[#E0F7FA] to-[#E0F2F1]' : 'from-[#FDE2E4] to-[#FAE1DD]'} rounded-lg shadow-md`}>
                      <Text className='text-sm font-semibold pt-2'>
                        { message.role == 'assistant' ? 'AI HR:' : 'Пользователь:'}
                      </Text>
                      {/* <Text className='text-[1rem] font-normal'>
                        {message.content}
                      </Text> */}
                      <MemoizedReactMarkdown
                        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 text-sm font-normal"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        components={{
                          p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                          },
                        }}
                      >
                        {message.content}
                      </MemoizedReactMarkdown>
                    </Box>
                    </div>
                  ))}
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
