import { useContext, useEffect, useState } from "react";
import Header from "./Header.jsx";
import Details from "./Details.jsx";
import OverView from "./OverView.jsx";
import ThemeIcon from "./ThemeIcon.jsx";
import { fetchQuote, fetchStockDetails } from "../api/stock-api.js";
import ChartFromTradingView from "./ChartFromTradingView.jsx";
import ThemeContext from "../context/ThemeContext.jsx";
import StockContext from "../context/StockContext.jsx";
import ReadNews from "./ReadNews.jsx";

function Dashboard() {
    const { darkMode } = useContext(ThemeContext);
    const { stockSymbol } = useContext(StockContext);
    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});
    // const [news, setNews] = useState({})

    useEffect(() => {
        const updateStockDetails = async () => {
            try {
                const result = await fetchStockDetails(stockSymbol);
                setStockDetails(result);
            } catch (error) {
                setStockDetails({});
                console.log(error);
            }
        };

        const updateStockOverView = async () => {
            try {
                const result = await fetchQuote(stockSymbol);
                setQuote(result);
            } catch (error) {
                setQuote({});
                console.log(error);
            }
        };

        // const updateNews = async () => {
        //     try {
        //         const result = await fetchNews(stockSymbol);
        //         setNews(result)
        //         console.log(result);
        //     } catch (error) {
        //         setNews({});
        //         console.log(error);
        //     }
        // }

        // updateNews();
        updateStockDetails();
        updateStockOverView();
    }, [stockSymbol]);

    return (
        <div className="w-screen">
            <div>
                <div className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-15 md:grid-rows-14 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quickSand  
            ${darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-300"}`}
                >
                    <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
                        <Header name={stockDetails.name} />
                        <ThemeIcon />
                    </div>
                    <div className="md:col-span-2  row-span-4">
                        <ChartFromTradingView />
                    </div>
                    <div>
                        <OverView
                            symbol={stockSymbol}
                            price={quote.pc}
                            change={quote.d}
                            changePercent={quote.dp}
                            currency={stockDetails.currency}
                            logo={stockDetails.logo}
                        />
                    </div>
                    <div className="row-span-2 xl:row-span-3">
                        <Details details={stockDetails} />
                    </div>
                </div>
            </div>
            <div
                className={`left-0  font-quickSand ${darkMode ? "bg-gray-900 text-gray-100" : "bg-neutral-300"}`}>
                <div className="xl:px-32">
                    <h1 className="text-5xl mb-7 sm:pt-9">News Related to {stockSymbol}</h1>
                </div>
                <ReadNews symbol={stockSymbol} />
            </div>
        </div>

    );
}

export default Dashboard;
