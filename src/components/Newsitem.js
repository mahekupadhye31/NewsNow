import React from 'react'
function Newsitem(props) {
  return (

       <div>
        <div className="card mx-3">
          <img
            src={
              props.imageurl
                ? props.imageurl
                : "https://images.indianexpress.com/2023/01/ranji-trophy-stock-fb.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {props.title}...{" "}
              <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
                {props.source}
              </span>
            </h5>
            <p className="card-text">{props.description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By: {props.author ? props.author : "Unknown"} | Published on:{" "}
                {new Date(props.publishedAt).toGMTString()}
              </small>
            </p>
            <a href={props.newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
      
  )
}

export default Newsitem

