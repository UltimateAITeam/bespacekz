import React, {ReactElement} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,} from "@chakra-ui/react";
import ProfileInfoForm from "@/components/forms/ProfileInfoForm";
import ProfileEducationEditForm from "@/components/forms/ProfileEducationEditForm";
import ProfileExperienceEditForm from "@/components/forms/ProfileExperienceEditForm";
import ProfileSkillsEditForm from "@/components/forms/ProfileSkillsEditForm";

function ProfileMultiModal({form, isOpen, onClose}: { form: string, isOpen: boolean, onClose: () => void }) {

    function handleSubmit(data: any) {
        console.log(data)
    }

    const forms: { [index: string]: ReactElement } = {
        "edit-info": <ProfileInfoForm onSubmit={handleSubmit} onClose={onClose}/>,
        "add-experience": <div>ADD EXP</div>,
        "edit-experience": <ProfileExperienceEditForm onSubmit={handleSubmit} onClose={onClose}/>,
        "add-education": <div>ADD EDU</div>,
        "edit-education": <ProfileEducationEditForm onSubmit={handleSubmit} onClose={onClose} />,
        "edit-skills": <ProfileSkillsEditForm onSubmit={handleSubmit} onClose={onClose} />,
        "edit-about": <div>EDIT ABOUT</div>,
    }
    if (!forms.hasOwnProperty(form)) return null;

    return (
        <Modal
            size={'xl'}
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit profile</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {forms[form]}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default ProfileMultiModal;