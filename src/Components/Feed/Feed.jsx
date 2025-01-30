import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchdata = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const result = await response.json();
        setData(result.items);
    };

    useEffect(() => {
        fetchdata();
    }, [category]);

    return (
        <div className="feed">
            {data.map((item) => (
                <Link 
                    to={`video/${item.snippet.categoryId}/${item.id}`} 
                    className='card' 
                    key={item.id} // Unique key prop added here
                >
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3> {/* Corrected property name */}
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
