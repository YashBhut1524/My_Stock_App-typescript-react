/* eslint-disable react/prop-types */

import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"
import StockContext from "../context/StockContext"

function SearchResult({ setInput, results }) {

    const { darkMode } = useContext(ThemeContext)
    const { stockSymbol, setStockSymbol } = useContext(StockContext)

    return (
        <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  custom-scrollbar ${darkMode ? "bg-gray-900 border-neutral-800" : "bg-white border-neutral-200"}`}>
            {results.map(item => {
                return (
                    <li
                        key={item.symbol}
                        className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md 
                            ${darkMode ? "hover:bg-indigo-950" : "hover:bg-indigo-200"}
                        `}
                        onClick={() => {
                            setStockSymbol(item.symbol);
                            console.log(stockSymbol);
                            setInput("")
                        }}
                    >
                        <span>{item.symbol}</span>
                        <span>{item.description}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export default SearchResult