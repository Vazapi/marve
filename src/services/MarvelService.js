import {useHttp} from '../hooks/http.hook';
const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=078c1ad58f698352a5dcd65a6e6d8869';

    const _baseOffset = 210;

    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // console.log('запрос');
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComics);
    }

    const getComicOne = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        
        return res.data.results.map(_transformCharacter)[0];
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (char) => {
        return {
            id: char.id,
            title: char.title,
            price: char.prices[0].price,
            thumbnail: char.thumbnail.path + '.jpg',
            description: char.description,
            pageCount: char.pageCount,
            language: char.language


        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics, getComicOne, getCharacterByName}
}

export default useMarvelService;