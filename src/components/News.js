import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  document.title = `${props.category ? capitalizeFirstLetter(props.category) : 'General'}+ NewsMonkey`

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log("parsedData: ", parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, []);

  // const onPreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // }

  // const onNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // }

  const fetchMoreData = async() => {
    setPage(page+1);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData: ", parsedData);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    setTotalResults(parsedData.totalResults);
  }

    return (
      <>
        {/* {loading && <Spinner />} */}
        <h2>News Monkey - Top headlines</h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={ fetchMoreData }
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner />}
        >
          <div className="container">
            <div className='row my-3'>
              {articles.map((element, index) => {
                  return <div className="col-md-4" key={index}>
                  <NewsItem key={element.key} title={element.title ? element.title.slice(0, 88): "No Title"} description={element.description ? element.description.slice(0, 88) : "-"} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* {
        !loading && 
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1 } className="btn-dark" onClick={onPreviousClick}>&larr;Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} className="btn-dark" onClick={onNextClick}>Next &rarr;</button>
        </div>
        } */}
      </>
    )
}

export default News;