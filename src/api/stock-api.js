const basePath = "https://finnhub.io/api/v1";

export const searchSymbol = async (input) => {
    const url = `${basePath}/search?q=${input}&token=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(url);


    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }

    return await response.json();
}

export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${import.meta.env.VITE_API_KEY}`
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const fetchHistoricalData = async (stockSymbol, resolution, from, to) => {
    const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const fetchNews = async (stockSymbol) => {
    // /company-news?symbol=AAPL&from=2023-08-15&to=2022-08-20
    const url = `${basePath}/company-news?symbol=${stockSymbol}&from=2023-08-15&to=2023-08-20&token=${import.meta.env.VITE_API_KEY}`
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}