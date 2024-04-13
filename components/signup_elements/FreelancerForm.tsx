"use client";

import React, { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { useSession } from "next-auth/react";

type FormValues = {
  name: string;
  skills: string;
  portfolio: string;
};
interface Education {
  level: string;
  place: string;
  year: string;
  specialty: string;
}
interface Skill {
  name: string;
  level: string;
}

function FreelancerForm() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {};
  const [skills, setSkills] = useState<Array<Skill>>(
    Array.from({ length: 1 }, () => ({ name: "", level: "" })),
  );
  const [education, setEducation] = useState<Array<Education>>([
    { level: "NO", place: "", year: "", specialty: "" },
  ]);

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { level: "NO", place: "", year: "", specialty: "" },
    ]);
  };
  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string,
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };

  const session = useSession();

  const role = session.data?.user.role?.toString();
  return (
    <div className="m-auto min-h-full justify-center px-6 py-12 lg:px-8 text-black">
      <form
        className="w-80 m-auto flex flex-col dark:text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {role === "CLIENT" ? (
          <div aria-roledescription={role}>
            <Input type={"text"} placeholder={""} />
          </div>
        ) : (
          <div>
            <h1 className={"text-lg text-center mb-2"}>
              Дополнительная информация
            </h1>
            {education.map((edu, index) => (
              <div key={index} className={"mb-2"}>
                <label htmlFor={`education${index}.level`}>
                  Уровень образования:
                </label>
                <select
                  value={edu.level}
                  onChange={(e) =>
                    handleEducationChange(index, "level", e.target.value)
                  }
                  className="mb-2 w-full border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                >
                  <option value="NO">Без образования</option>
                  <option value="SC">Школьник</option>
                  <option value="BA">Бакалавр</option>
                  <option value="MA">Магистр</option>
                  <option value="DO">Доктор</option>
                </select>

                <div className={"relative"}>
                  <Input
                    type={"text"}
                    value={edu.place}
                    onChange={(e) =>
                      handleEducationChange(index, "place", e.target.value)
                    }
                    className={"w-full mb-2 w-1/2 mr-2"}
                    placeholder={"Место окончания"}
                  />
                  <Input
                    type={"number"}
                    value={edu.year}
                    onChange={(e) =>
                      handleEducationChange(index, "year", e.target.value)
                    }
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "40%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    className={"w-1/3"}
                    placeholder={"Год"}
                  />
                </div>

                <Input
                  type={"text"}
                  value={edu.specialty}
                  onChange={(e) =>
                    handleEducationChange(index, "specialty", e.target.value)
                  }
                  className={"w-full mb-2"}
                  placeholder={"Специальность"}
                />
              </div>
            ))}
            <span
              className={"bg-gray-700 py-2 px-2 cursor-pointer"}
              onClick={handleAddEducation}
            >
              Добавить образование
            </span>
            <h4 className={"my-2"}>Опыт работы</h4>
            <hr className={"mb-2"} />
            <Input
              type={"text"}
              className={"w-full mb-2"}
              placeholder={"Предыдущие проекты и заказы"}
            />
            <Input
              type={"text"}
              className={"w-full mb-2"}
              placeholder={"Ваши обязанности"}
            />
            <Input
              type={"number"}
              className={"w-full"}
              placeholder={"Продолжительность работы (месяцы)"}
            />

            <h4 className={"my-2"}>Навыки и компетенции:</h4>
            <hr className={"mb-2"} />
            {skills.map((skill, index) => (
              <div key={index} className={"mb-2"}>
                <label htmlFor={`skill${index}`}>Навык {index + 1}:</label>
                <Input
                  className={"w-full"}
                  type="text"
                  placeholder={`Навык ${index + 1}`}
                  value={skill.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSkillChange(index, "name", e.target.value)
                  }
                />

                <label htmlFor={`skill${index}.level`}>Уровень владения:</label>
                <input
                  type="text"
                  className="mb-2 w-full border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                  placeholder={"Уровень владения"}
                  value={skill.level}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSkillChange(index, "level", e.target.value)
                  }
                />
              </div>
            ))}
            <span
              className={"bg-gray-700 py-2 px-2 cursor-pointer"}
              onClick={handleAddSkill}
            >
              Добавить навык
            </span>
          </div>
        )}
        <button
          className="text-white mt-2 border-gray-500 py-2 px-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FreelancerForm;
