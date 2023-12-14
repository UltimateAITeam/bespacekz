import React, {ReactElement} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,} from "@chakra-ui/react";
import ProfileInfoForm from "@/components/forms/ProfileInfoForm";
import ProfileEducationEditForm from "@/components/forms/ProfileEducationEditForm";
import ProfileExperienceEditForm from "@/components/forms/ProfileExperienceEditForm";
import ProfileSkillsEditForm from "@/components/forms/ProfileSkillsEditForm";
import ProfileAboutEditForm from "@/components/forms/ProfileAboutEditForm";
import ProfileEducationAddForm from "@/components/forms/ProfileEducationAddForm";
import ProfileExperienceAddForm from "@/components/forms/ProfileExperienceAddForm";
import ProfileTitleEditForm from "@/components/forms/ProfileTitleEditForm";

interface HandleData {
    info: any;
    action: 'add' | 'edit' | 'delete';
    table: string;
}

function ProfileMultiModal({data, form, isOpen, onClose, setData, setLoading}: { data: any, form: string, isOpen: boolean, onClose: () => void, setData: (data: any) => void, setLoading: (data: boolean) => void}){

    async function handleSubmit(data: HandleData) {
        onClose();
        setLoading(true);
        let method;
        switch (data.action) {
            case "add":
                method = "POST";
                break;
            case "edit":
                method = "PUT";
                break;
            case "delete":
                method = "DELETE";
                break;
        }
        if (!method) {
            console.log(data);
            return;
        }
        const resp = await fetch('/api/crud_profile/crud', {
            method: method,
            body: JSON.stringify({info: data.info, type: data.table})
        })
        if (resp.status !== 200) console.log(resp.body)
        const res = await fetch("/api/get_freelancer_profile");
        const dta = await res.json();
        setData(dta);
        setLoading(false);
    }

    const forms: { [index: string]: ReactElement } = {
        "edit-jobTitle": <ProfileTitleEditForm data={data} onSubmit={handleSubmit} onClose={onClose}/>,
        "edit-info": <ProfileInfoForm data={data} onSubmit={handleSubmit} onClose={onClose}/>,
        "add-experience": <ProfileExperienceAddForm data={data} onSubmit={handleSubmit} onClose={onClose} />,
        "edit-experience": <ProfileExperienceEditForm data={data} onSubmit={handleSubmit} onClose={onClose}/>,
        "add-education": <ProfileEducationAddForm data={data} onSubmit={handleSubmit} onClose={onClose} />,
        "edit-education": <ProfileEducationEditForm data={data} onSubmit={handleSubmit} onClose={onClose} />,
        "edit-skills": <ProfileSkillsEditForm data={data} onSubmit={handleSubmit} onClose={onClose} />,
        "edit-about": <ProfileAboutEditForm data={data} onSubmit={handleSubmit} onClose={onClose} />,
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