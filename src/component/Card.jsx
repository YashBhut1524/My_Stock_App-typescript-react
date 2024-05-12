/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function card({ children }) {

    const { darkMode } = useContext(ThemeContext)

    return (
        <div className={`w-full h-full rounded-md relative p-8 border-2  
                ${darkMode ? "bg-gray-900k border-gray-800 " : "bg-white border-neutral-200 "}
            `}>
            {children}
        </div>
    )
}

export default card;
