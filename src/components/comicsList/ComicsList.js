import './comicsList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(8);

    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    
    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        
    }, [])
    const onRequest = (offset, initial)  => {
        initial ? setNewItemLoading(false): setNewItemLoading(true);
        
        getComics(offset).then(onComicListLoaded);

        
        
    }
    

    const onComicListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);

        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setCharEnded(ended);
    }
    

    const content = renderItems(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}  
            <button 
            onClick={() => onRequest(offset)} 
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}



const renderItems = (arr) => {
    let items = arr.map((item, i) => {
        return (
            
            <li className="comics__item" key={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        )
        
    })
    
    return (
        <ul className="comics__grid">
                {items}
        </ul>
    )
    
}


export default ComicsList;