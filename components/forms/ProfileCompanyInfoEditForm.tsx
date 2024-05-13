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
  sphereOfWork: string;
  mailIndex: string;
  address: string;
  contactUrl: string;
}

interface FormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  data: any;
}

function Page({ onSubmit, onClose, data }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    sphereOfWork: data.sphereOfWork || "",
    address: data.address || "",
    mailIndex: data.mailIndex || "",
    contactUrl: data.contactUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      info: formData,
      action: "edit",
      table: "client_profile",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} gap={4}>
      <FormControl mt={2} id="degree">
        <FormLabel>Почтовый индекс</FormLabel>
        <Input
          name="mailIndex"
          type="text"
          value={formData.mailIndex}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={2} id="degree">
        <FormLabel>Адрес</FormLabel>
        <Input
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={2} id="degree">
        <FormLabel>Сфера деятельности</FormLabel>
        <Input
          name="sphereOfWork"
          type="text"
          value={formData.sphereOfWork}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={2} id="degree">
        <FormLabel>Веб-сайт</FormLabel>
        <Input
          name="contactUrl"
          type="url"
          value={formData.contactUrl}
          onChange={handleChange}
        />
      </FormControl>
      <Flex mt={6} gap={3}>
        <Button variant={"ghost"} onClick={onClose}>
          Назад
        </Button>
        <Spacer />
        <Button colorScheme="blue" type="submit">
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
}

export default Page;
