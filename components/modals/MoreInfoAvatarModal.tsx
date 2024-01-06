import React from 'react';
import {
    Avatar,
    Button, HStack,
    Modal,
    ModalBody,
    Text,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, VStack, Wrap, WrapItem
} from "@chakra-ui/react";
import UploadAvatar from "@/components/UploadAvatar";

function MoreInfoAvatarModal({ isOpen, onClose, avatar }: { avatar: string | null, isOpen: boolean, onClose: () => void}) {
    const [preview, setPreview] = React.useState(avatar);
    return (
        <div>
            <Modal size={'xl'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Фото</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={10}>
                            <VStack>
                                <UploadAvatar preview={preview} setPreview={setPreview} propSrc={avatar} />
                                <Text>250 x 250</Text>
                                <Text fontSize={"sm"}>5mb</Text>
                            </VStack>
                            <VStack alignItems={'flex-start'}>
                                <Text fontSize={"medium"}>
                                    Вариации вашей фотографии
                                </Text>
                                <Wrap align={"end"}>
                                    <WrapItem>
                                        <Avatar size='xl' src={preview || undefined} />
                                    </WrapItem>
                                    <WrapItem>
                                        <Avatar size='lg' src={preview || undefined} />
                                    </WrapItem>
                                    <WrapItem>
                                        <Avatar size='md' src={preview || undefined} />
                                    </WrapItem>
                                    <WrapItem>
                                        <Avatar size='sm' src={preview || undefined} />
                                    </WrapItem>
                                </Wrap>
                                <Text fontSize={"sm"}>
                                    Фотография должна быть актуальна с соответсвием как вы выглядите сегодня
                                </Text>
                            </VStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Отмена
                        </Button>
                        <Button disabled={!!preview} colorScheme='blue'>Загрузить фото</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default MoreInfoAvatarModal;