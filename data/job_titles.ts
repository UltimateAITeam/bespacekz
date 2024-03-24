export interface Options {
    readonly value: string;
    readonly label: string;
}

export interface GroupedOption {
    readonly label: string;
    readonly options: readonly Options[];
}


export const titles: readonly GroupedOption[] = [
    {
        label: "IT & Software",
        options: [
            { value: "Frontend Developer", label: "Frontend Developer" },
            { value: "Data Science", label: "Data Science" },
            { value: "Backend Developer", label: "Backend Developer" },
            { value: "Full Stack Developer", label: "Full Stack Developer" },
            { value: "DevOps Engineer", label: "DevOps Engineer" },
            { value: "Software Architect", label: "Software Architect" },
            { value: "Mobile App Developer", label: "Mobile App Developer" },
            { value: "Cloud Solutions Engineer", label: "Cloud Solutions Engineer" },
        ],
    },
    {
        label: "Product Management",
        options: [
            { value: "Product Manager", label: "Product Manager" },
            { value: "Senior Product Manager", label: "Senior Product Manager" },
            { value: "Director of Product Management", label: "Director of Product Management" },
            { value: "Product Owner", label: "Product Owner" },
            { value: "Technical Product Manager", label: "Technical Product Manager" },
            { value: "Product Strategist", label: "Product Strategist" },
        ],
    },
    {
        label: "Design",
        options: [
            { value: "UI/UX Designer", label: "UI/UX Designer" },
            { value: "Graphic Designer", label: "Graphic Designer" },
            { value: "Web Designer", label: "Web Designer" },
            { value: "Senior Designer", label: "Senior Designer" },
            { value: "Lead Designer", label: "Lead Designer" },
            { value: "Motion Graphics Artist", label: "Motion Graphics Artist" },
        ],
    },
    {
        label: "Marketing",
        options: [
            { value: "Marketing Specialist", label: "Marketing Specialist" },
            { value: "Digital Marketing Manager", label: "Digital Marketing Manager" },
            { value: "Content Strategist", label: "Content Strategist" },
            { value: "SEO Analyst", label: "SEO Analyst" },
            { value: "Social Media Coordinator", label: "Social Media Coordinator" },
        ],
    },
    {
        label: "Finance",
        options: [
            { value: "Financial Analyst", label: "Financial Analyst" },
            { value: "Senior Financial Consultant", label: "Senior Financial Consultant" },
            { value: "Chief Financial Officer", label: "Chief Financial Officer" },
        ],
    },
    {
        label: "Healthcare",
        options: [
            { value: "Registered Nurse", label: "Registered Nurse" },
            { value: "Medical Doctor", label: "Medical Doctor" },
            { value: "Pharmacist", label: "Pharmacist" },
            { value: "Healthcare Administrator", label: "Healthcare Administrator" },
        ],
    },
    {
        label: "Education",
        options: [
            { value: "Teacher", label: "Teacher" },
            { value: "Professor", label: "Professor" },
            { value: "Education Consultant", label: "Education Consultant" },
            { value: "School Administrator", label: "School Administrator" },
        ],
    },
];

