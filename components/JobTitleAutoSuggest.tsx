'use client';
import React from 'react';
import {GroupedOption, Options, titles} from "@/data/job_titles";
import CreatableSelect from "react-select/creatable";

function JobTitleAutoSuggest({title, setTitle, className}: { className?: string, title: string, setTitle: (val: string) => void }) {


    return (
        <CreatableSelect<Options, false, GroupedOption>
            options={titles}
            placeholder={"Начните вводить название специальности"}
            className={className}
            onChange={(val) => {
                if (!val) return;
                setTitle(val.value);
                console.log("VALUE", val.value)
            }}
            value={{value: title, label: title}}
            defaultValue={titles[0].options[0]}
        />
    );
}

export default JobTitleAutoSuggest;