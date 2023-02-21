import './SingleComicPage.scss';

import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';


import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {
    const re = useParams()
    console.log(re)
    const {comicId, characterId} = useParams();

    const [comic, setComic] = useState(null);

    const [character, setCharacter] = useState(null)
    const {loading, error, getComicOne, clearError, getCharacter} = useMarvelService();



    const updateComic = () => {
        clearError();

        getComicOne(comicId)
            .then(onComicLoaded);
            
        
    }
    const onComicLoaded = (comic) => {
        setComic(comic);
        
    }

    const updateCharacter = () => {
        clearError();

        getCharacter(characterId)
            .then(res => onCharacterLoaded(res))
    }

    const onCharacterLoaded = (char) => {
        setCharacter(char);
        
    }


    useEffect(() => {
        if (comicId) updateComic();
        if (characterId) updateCharacter();
    },[comicId, characterId])

    console.log(character);
    
    const errorMessage = error ? <ErrorMessage/> : null;

    const spinner = loading ? <Spinner/> : null;
    let content ;
    if (comicId) {
        content = !(loading || error  ||  !comic ) ? <View comic={comic}/> : null;
    }
    if (characterId) {
        content = !(loading || error  ||  !character ) ? <View  character={character}/> : null;
    }
    
    
    return (
        <>
            <Helmet>
                <title>Comics and Hero</title>
                <meta
                name="description"
                content="Comics and Hero"
                />
            </Helmet>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


const View = ({comic, character}) => {
    console.log(comic, character);
    if (comic) {
        const {title, description, pageCount, thumbnail, language, price} = comic;
    
        return (
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}р</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    if (character) {
        console.log(character);
        const {thumbnail, name, description} = character;
        return (
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
   
            </div>
        )
    }
    
}

export default SingleComicPage;