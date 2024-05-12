import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"


function ThemeIcon() {
    const { darkMode, setDarkMode } = useContext(ThemeContext)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    return (
        <button
            className={`rounded-lg border-1  p-2 absolute right-8 xl:right-32 shadow-lg 
                ${darkMode ? "shadow-gray-800  bg-slate-700 border-neutral-900" : "bg-slate-50 border-neutral-400"}`}
            onClick={toggleDarkMode}
        >
            {darkMode
                ? <MoonIcon className=" stroke-yellow-500 fill-yellow-500 h-8 w-8 cursor-pointer stroke-1" />
                : <SunIcon className={`h-8 w-8 cursor-pointer stroke-1 fill-none stroke-yellow-500 fill-yellow-500 
            `} />}

        </button>
    )
}

export default ThemeIcon