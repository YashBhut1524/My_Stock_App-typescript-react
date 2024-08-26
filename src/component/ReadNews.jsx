import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { convertUnixTimestampToDate } from '../helpers/date-helper';
import StockContext from "../context/StockContext";
import { fetchNews } from "../api/stock-api";

function ReadNews() {
    const { darkMode } = useContext(ThemeContext);
    const [newsData, setNewsData] = useState([]);
    const [displayCount, setDisplayCount] = useState(10); // State to track number of news items to display
    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNews(stockSymbol);
                setNewsData(data);
            } catch (error) {
                console.error("Error fetching news data:", error);
            }
        };

        fetchData();
    }, [stockSymbol]);

    // Slice the newsData array based on displayCount
    const displayedNews = newsData.slice(0, displayCount);

    // Function to load more news items
    const loadMoreNews = () => {
        setDisplayCount(prevCount => prevCount + 10); // Increase displayCount by 10
    };

    // Function to show less news items
    const showLessNews = () => {
        setDisplayCount(prevCount => prevCount - 10); // Set displayCount back to 10
    };

    return (
        <div className={`w-screen ${darkMode ? "bg-gray-900 text-gray-100 " : "bg-neutral-300"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {displayedNews.map(item => (
                    <div key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <Card className={` ${darkMode ? "bg-slate-900 text-gray-100" : "bg-neutral-300"}`}>
                                <div className="text-lg font-bold pb-20">{item.headline}</div>
                                <img className="w-[250px] h-[250px] rounded-xl mb-20" src={item.image} alt={item.headline} />
                                <p>{item.summary}</p>
                                <div className="mt-6 font-bold">{convertUnixTimestampToDate(item.datetime)}</div>
                                <div className="font-bold">Source: {item.source}</div>
                            </Card>
                        </a>
                    </div>
                ))}
            </div>
            {newsData.length > displayCount ? (
                <div className="flex justify-center">
                    {displayCount != newsData.length && <button className="my-8 px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={loadMoreNews}>Read More</button>}
                    {displayCount > 10 && <button className="my-8 px-4 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={showLessNews}>Show Less</button>}
                </div>
            ) : null}
            <div className="pb-36 pt-10">
                <span className="flex justify-center p-10 bg-red-500 text-3xl font-extrabold">Finnhub have changed Free API to Premium So can't fetch News T_T</span>
            </div>
        </div>
    );
}

export default ReadNews;
