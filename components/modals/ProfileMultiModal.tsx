"use client";
import React, { ReactElement } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ProfileInfoForm from "@/components/forms/ProfileInfoForm";
import ProfileEducationEditForm from "@/components/forms/ProfileEducationEditForm";
import ProfileExperienceEditForm from "@/components/forms/ProfileExperienceEditForm";
import ProfileLanguagesEditForm from "@/components/forms/ProfileLanguagesEditForm";
import ProfileAboutEditForm from "@/components/forms/ProfileAboutEditForm";
import ProfileEducationAddForm from "@/components/forms/ProfileEducationAddForm";
import ProfileExperienceAddForm from "@/components/forms/ProfileExperienceAddForm";
import ProfileTitleEditForm from "@/components/forms/ProfileTitleEditForm";
import ProfileCompanyInfoEditForm from "@/components/forms/ProfileCompanyInfoEditForm";
import { Role } from "@prisma/client";
import ProfileCompanyDescriptionEditForm from "@/components/forms/ProfileCompanyDescriptionEditForm";
import ProfileCompanyVacancyEditForm from "@/components/forms/ProfileCompanyVacancyEditForm";
import ProfileCompanyVacancyAddForm from "@/components/forms/ProfileCompanyVacancyAddForm";
import PortfolioForm from "../forms/PortfolioForm";

interface HandleData {
  info: any;
  action: "add" | "edit" | "delete";
  table: string;
}

function ProfileMultiModal({
  data,
  role,
  form,
  isOpen,
  onClose,
  setData,
  setLoading,
}: {
  data: any;
  role: string;
  form: string;
  isOpen: boolean;
  onClose: () => void;
  setData: (data: any) => void;
  setLoading: (data: boolean) => void;
}) {
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
      return;
    }
    const resp = await fetch(
      role === Role.FREELANCER
        ? "/api/crud_profile/crud"
        : "/api/crud_profile/client_crud",
      {
        method: method,
        body: JSON.stringify({ info: data.info, type: data.table }),
      },
    );
    if (resp.status !== 200) {
      const res = await fetch(
        role === Role.FREELANCER
          ? "/api/get_freelancer_profile"
          : "/api/get_client_profile",
      );
      const dta = await res.json();
      setData(dta);
      setLoading(false);
    }
    setLoading(false);
    // refresh page
  }

  const forms: { [index: string]: ReactElement } = {
    "edit-jobTitle": (
      <ProfileTitleEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-info": (
      <ProfileInfoForm data={data} onSubmit={handleSubmit} onClose={onClose} />
    ),
    "add-experience": (
      <ProfileExperienceAddForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-experience": (
      <ProfileExperienceEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "add-education": (
      <ProfileEducationAddForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-education": (
      <ProfileEducationEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-languages": (
      <ProfileLanguagesEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-about": (
      <ProfileAboutEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-company-info": (
      <ProfileCompanyInfoEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-company-description": (
      <ProfileCompanyDescriptionEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "add-vacancy": (
      <ProfileCompanyVacancyAddForm
        data={data}
        onSubmit={handleSubmit}
        onCloseModal={onClose}
      />
    ),
    "edit-vacancy": (
      <ProfileCompanyVacancyEditForm
        data={data}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    ),
    "edit-portfolio": <PortfolioForm data={data} />,
  };
  if (!forms.hasOwnProperty(form)) return null;

  return (
    <Modal
      size={"xl"}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{forms[form]}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProfileMultiModal;
