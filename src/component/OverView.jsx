/* eslint-disable react/prop-types */
import { useContext } from "react"
import Card from "./Card"
import ThemeContext from "../context/ThemeContext"

function OverView({ symbol, price, change, changePercent, currency, logo }) {

    const { darkMode } = useContext(ThemeContext)

    return (
        <Card >
            <span className={`absolute left-8 top-2  text-md xl:text-lg 2xl:text-2xl 
                        ${darkMode ? "text-neutral-400" : "text-neutral-900"}`
            }>
                {symbol}
            </span>
            <div className="mt-6">
                <img
                    className={`w-[25px] h-[25px] xl:w-[50px] xl:h-[50px] xl:my-2 justify-center items-center 
                    ${darkMode ? "bg-neutral-900" : ""}
                `}
                    src={logo}
                    alt={symbol}
                />
            </div>
            <div className='w-full h-full items-center flex justify-center gap-4'>
                <span className='text-xl xl:text-3xl 2xl:text-3xl flex items-center sm:text-2xl xl:pb-36 sm:pb-12'>
                    ${price}
                    <span className='text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2 xl:pb-1 '>
                        {currency}
                    </span>
                </span>
                <span className={`text-sm xl:text-lg 2xl:text-xl mr-2 xl:pb-36 sm:pb-10 ${change > 0 ? "text-lime-500" : "text-red-500"}`}>
                    {change} <span>({changePercent}%)</span>
                </span>
            </div>
        </Card >
    )
}

export default OverView