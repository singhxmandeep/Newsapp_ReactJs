import React, {useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



// import {
//     createBrowserRouter,
//     RouterProvider,
//     Route,
//     Link,
//   } from "react-router-dom";

const News = (props) => {

  const [articles, setArticles]  = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

    
  

   const fetchArticles = async (page) => {
    props.setProgress(10);
    setLoading({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02a1cfc873484f6a9eb42167ce2fa5ed&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    fetchArticles(1)
    // eslint-disable-next-line
  }, []);



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=02a1cfc873484f6a9eb42167ce2fa5ed&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
  };

  
    return (
      <div className="container my-3">
        <h1 className="text-center " style = {{margin: "35px 0px", marginTop: "90px"}}>
          NewsMonkey: Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
      </div>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
