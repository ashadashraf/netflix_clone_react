import React, { useEffect, useState } from 'react'
import './RowPost.css';
import axiox from '../../axios';
import { imageUrl, API_KEY } from '../../constants/constants';
import YouTube from 'react-youtube';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState('');
    useEffect(() => {
        axiox.get(props.url)
        .then((response) => {
            setMovies(response.data.results);
        })
        .catch((err) => {
            alert('Network Error');
        });
    }, []);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleMovie = (id) => {
        axiox.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((response) => {
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0]);
            } else {
                console.log('Array Empty');
            }
        })
        .catch(() => {
            console.log('file not found');
        })
    }
    
    return (
        <div className='row'>
            <h2>{ props.title }</h2>
            <div className='posters'>
                {movies.map((obj) => (
                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster' } alt="poster" src={`${imageUrl + obj.backdrop_path}`} />
                ))}
            </div>
            {urlId && <YouTube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default RowPost