import React ,{useState,useEffect} from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News= (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


   
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    const update = async()=>{
        props.setProgress(10)
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=096596a644b7495283ac9d733d18e155&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data= await fetch(url)
        props.setProgress(30)
        let parseddata= await data.json();
        props.setProgress(70)

        setArticles(parseddata.articles)
        setTotalResults(parseddata.totalResults)
        setLoading(false)
        
        props.setProgress(100)

    }
    useEffect(() => {
        document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`
        update();
    
    }, [])
    
    const handlePrevious= async ()=>{

        setPage(page-1)
        update();
    }
    const handleNext= async ()=>{
        setPage(page+1)
        update();

        }
    const fetchMoreData = async () => {
   
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=096596a644b7495283ac9d733d18e155&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data= await fetch(url)
        let parseddata= await data.json();
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)

    };

    return (
        <>
        
        <h2 className='mb-4 text-center' style={{margin:"70px"}}><strong>Top {capitalizeFirstLetter(props.category)} Headlines</strong></h2>
        {!setLoading &&<Loader/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Loader/>}
        >
            <div className="container my-4 " >

            <div className="row">
                {articles.map((element)=>{   
                    return  <div className="col-md-4 mb-3" key={element.url}>
                    <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                    </div>        
                }
                )}
                </div>
            </div>
        </InfiniteScroll>
      </>
    )
  
}
export default News

News.defaultProps={
    country: 'in' ,
    pageSize :6,
    category: 'general'
    
}
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category : PropTypes.string,
}

