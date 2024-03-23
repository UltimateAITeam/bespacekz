import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { ChakraPhoneInput } from "@/components/ChakraPhoneInput";

interface FormData {
  name: string;
  last_name: string;
  location: string;
  phone: string;
  email: string;
}

interface FormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  data: any;
}

function ProfileInfoForm({ onSubmit, onClose, data }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: data.name || "",
    last_name: data.last_name || "",
    location: data.location,
    phone: data.phone || "",
    email: data.userEmail,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      info: formData,
      action: "edit",
      table: "user",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const phoneHandleChange = (phone: string) => {
    setFormData({
      ...formData,
      phone: phone,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Flex gap={4}>
        <FormControl id="first_name" isRequired>
          <FormLabel>Имя</FormLabel>
          <Input name="name" onChange={handleChange} value={formData.name} />
        </FormControl>
        <FormControl id="last_name" isRequired>
          <FormLabel>Фамилия</FormLabel>
          <Input
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
          />
        </FormControl>
      </Flex>
      <FormControl id="location" isRequired>
        <FormLabel>Город</FormLabel>
        <Input
          name="location"
          onChange={handleChange}
          value={formData.location}
        />
      </FormControl>
      <Flex gap={4} mt={2}>
        <FormControl id="phone" isRequired>
          <FormLabel>Телефон</FormLabel>
          <FormHelperText mt={-2} mb={2}>
            Пример: +7 771 234-56-78
          </FormHelperText>
          <ChakraPhoneInput
            onChange={phoneHandleChange}
            value={formData.phone}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <FormHelperText mt={-2} mb={2}>
            Пример: test@gmail.com
          </FormHelperText>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </FormControl>
      </Flex>
      <Flex mt={6} gap={3}>
        <Spacer />
        <Button type="button" onClick={onClose}>
          Отмена
        </Button>
        <Button colorScheme="blue" type="submit">
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
}

export default ProfileInfoForm;
