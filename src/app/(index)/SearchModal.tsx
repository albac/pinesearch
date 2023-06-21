"use client";

import { useState } from "react";
import Image from "next/image";
import SearchModalFooter from "./SearchModalFooter";

interface ISelectionProps {
    text: string
}

const defaultSelections = [
    "What does the future of quantum computing look like?",
    "What is the nature of consciousness, and how does it arise in the brain?",
    "What are the cultural, and psychological factors that influence human behavior"
]

const Selection = ({ text }: ISelectionProps) => {
    return (
        <div className="flex px-6 bg-slate-100 rounded-3xl w-1/2 h-24 items-center justify-between mb-4 cursor-pointer">
            <p className="text-left w-3/4">{text}</p>
            <div className="rounded-full bg-black h-8 w-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    )
}

export default function SearchModal() {
    const [query, setQuery] = useState("What is neuroscience?");
    const [result, setResult] = useState<string | null>(" Neuroscience is the scientific study of the nervous system, including the brain, spinal cord, and peripheral nerves. It focuses on how the nervous system develops, is structured, and what it does. It also studies the related functions of cognition, emotion, and behavior.");

    const onSubmitSearch = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/read", {
                method: "POST",
                body: JSON.stringify({ question: query })
            });

            const result = await response.json();
            setResult(result);
        } catch (e) {
            const typedError = e as Error;
            console.log("Error submitting search - ", typedError.message)
        }
    }

    const searchInit = (
        <>
            <h1 className="mt-24 font-bold text-2xl mb-8">Examples</h1>
            { defaultSelections.map((selectionText, index) => <Selection key={index} text={selectionText} />)}
        </>
    );

    const searchResult = (
        <>
            <div className="flex flex-col w-5/6 justify-center p-8 mt-2 border-b border-slate-100">
                <div className="flex w-full items-center">
                    <div className="w-10 h-10 rounded-full border border-gray flex justify-center items-center ">
                        <Image src="/icons/user.svg" alt="user" width="20" height="20" /> 
                    </div>
                    <p className="ml-4 w-5/6 text-left">{query}</p>
                </div>
                <div className="flex w-full mt-8">
                    <Image src="/icons/AI.svg" alt="user" width="40" height="40" className="h-10" /> 
                    <p className="ml-4 w-full text-left">{result}</p>
                </div>
            </div>
            <h3>Your Question is Answered In These Posts </h3>
        </>
    );

    return (
        <div className="h-full w-full bg-slate-600 bg-opacity-50 z-10 absolute top-0 left-0 flex flex-col justify-center items-center">
            <div className="h-3/4 w-2/3 bg-white rounded-3xl bg-opacity-100 flex flex-col items-center relative">
                { !result ? searchInit : searchResult }
                <SearchModalFooter 
                    onSubmitSearch={onSubmitSearch}
                    query={query}
                    setQuery={setQuery} 
                />
            </div>
        </div>
    )
}