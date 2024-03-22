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
  Stack,
} from "@chakra-ui/react";
import { ChakraPhoneInput } from "@/components/ChakraPhoneInput";

interface FormData {
  title: string;
}

interface FormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  data: any;
}

function ProfileInfoForm({ onSubmit, onClose, data }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    title: data.jobTitle,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      info: formData.title,
      action: "edit",
      table: "jobTitle",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setFormData({
      title: value,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack>
        <FormControl id="title">
          <FormLabel>Job Title</FormLabel>
          <Input type="text" value={formData.title} onChange={handleChange} />
          <FormHelperText>Enter your job title.</FormHelperText>
        </FormControl>
        <Flex>
          <Spacer />
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

export default ProfileInfoForm;
