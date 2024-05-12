/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
// import { mockSearchResults } from "../constants/mock"
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import SearchResult from './SearchResult';
import ThemeContext from '../context/ThemeContext';
import { searchSymbol } from '../api/stock-api';
import Card from "./Card"

function Search() {

    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    }

    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbol(input);
                const result = searchResults.result;
                console.log(result);
                setBestMatches(result);
            }
        } catch (error) {
            setBestMatches([]);
            console.log(error);
        }
    };

    const { darkMode } = useContext(ThemeContext)

    return (
        <div className={`flex items-center my-4 border-4 rounded-md relative z-50 w-96 
                ${darkMode ? "bg-gray-900 border-neutral-900" : "bg-white border-neutral-300"}
            `}
        >
            <input
                type="text"
                value={input}
                className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-slate-700" : null}`}
                placeholder='Search Stock...'
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />
            {input && <button onClick={clear} className={`rounded-full p-1 ${darkMode ? "hover:bg-slate-100 " : "hover:bg-slate-200"}`}>
                <XMarkIcon className={`h-4 w-4 ${darkMode ? "fill-white hover:fill-gray-900" : "fill-gray-600"}`} />
            </button>}
            <button onClick={updateBestMatches} className='h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center m-1 p-1'>
                <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100' />
            </button>
            {input && bestMatches.length > 0 ? <SearchResult setInput={setInput} results={bestMatches} /> : null}
        </div>
    )
}

export default Search