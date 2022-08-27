import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './Navbar.css'


const News = (props)=>{
    
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const updateNews = async (props)=> {
        // props.setProgress(10);
        // https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&country=au,ca
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=crypto&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        // const url = `https://newsapi.org/v2/everything?q=crypto&from=2022-07-19&sortBy=publishedAt&apiKey=${props.apiKey}`; 
        // const url = `https://newsdata.io/api/1/news?apiKey=pub_971276214e880f4c95ce1cc91e1885ce7699`; 
        setLoading(true)
        let data = await fetch(url);
        // props.setProgress(30);
        let parsedData = await data.json()
        // props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // props.setProgress(100);
    }
    useEffect(() => {
        updateNews(); 
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/everything?q=crypto&from=2022-07-19&sortBy=publishedAt&apiKey=${props.apiKey}`;
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=crypto&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '50px', fontFamily: 'Roboto' }}>Crypco <span className='news'>Top</span> Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles?.length}
                    next={fetchMoreData}
                    hasMore={articles?.length !== totalResults}
                    // hasMore={totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles?.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
