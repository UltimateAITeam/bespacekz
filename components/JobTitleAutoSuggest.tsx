'use client';
import React from 'react';
import Autosuggest from "react-autosuggest";
import {titles} from "@/data/job_titles";
import {Divider, VStack} from "@chakra-ui/react";


function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value: string) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    return titles
        .filter((section) => section.title.includes(value));
}

function getSuggestionValue(suggestion: typeof titles[0]) {
    return suggestion.title;
}

function renderSuggestion(suggestion: typeof titles[0]) {
    return (
        <strong>{suggestion.title}</strong>
    );
}

function renderSectionTitle(section: typeof titles[0]) {
    return (
        <span>{section.category}</span>
    );
}

function renderSuggestionsContainer({containerProps, children, query}: {
    containerProps: any,
    children: any,
    query: string
}) {

    return (
        <VStack justifyItems={"left"} {...containerProps} divider={<Divider/>}
                className={"p-2 cursor-pointer md:w-1/2 w-full"}>
            {children}
        </VStack>
    );
}

function getSectionSuggestions(section: typeof titles[0]) {
    return [section];
}

function JobTitleAutoSuggest({title, setTitle}: { title: string, setTitle: (val: string) => void }) {
    const [suggestions, setSuggestions] = React.useState<typeof titles>([]);

    const onSuggestionsFetchRequested = ({value}: { value: string }) => {
        setSuggestions(
            getSuggestions(value)
        );
    };
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const inputProps = {
        placeholder: "Senior Frontend Developer",
        className: "my-4 flex md:w-1/2 w-full flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] mb-4",
        value: title,
        onChange: (event: any, {newValue}: { newValue: string }) => setTitle(newValue)
    };

    return (
        <Autosuggest
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps}
        />
    );
}

export default JobTitleAutoSuggest;