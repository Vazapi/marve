import { useState } from "react";
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import FindHero from "../findHero/findHero";


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }
  
    return (
        <>
            <Helmet>
                <title>Marvel information portal</title>
                <meta
                name="description"
                content="Marvel information portal"
                />
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
        
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <CharInfo charId = {selectedChar}/>
                        <FindHero/>
                    </div>
                    
                </ErrorBoundary>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;