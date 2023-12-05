import React, {ReactNode} from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
} from "@chakra-ui/react";

function ProfileMultiModal({modal, isOpen, onClose}: {modal: ReactNode, isOpen: boolean, onClose: () => void}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modal}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="green">Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ProfileMultiModal;