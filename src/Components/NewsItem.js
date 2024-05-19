import React from "react";


const NewsItem = (props) =>  {
 
    // let title = props.title;
    // let description = props.description;
    let { description, imageUrl, newsUrl, date, author } = props;
    return (
      <div className=" my-3 ">
        <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: 0,
          }}
        >
          <span class="badge rounded-pill bg-danger">{props.source}</span>
        </div>
          <img src={ imageUrl? imageUrl: "https://www.hindustantimes.com/ht-img/img/2024/05/17/1600x900/PTI05-17-2024-000049B-0_1715927307716_1715927329405.jpg"} className="card-img-top" alt={imageUrl}/>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{description}</p>
          <p className=" card-text">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read mode</a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
