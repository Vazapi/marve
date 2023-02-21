import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount () {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide: ${this.state.slide}`;
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }


const countTotal = (num) => {
    console.log('counting...');

    return num + 10;
}

const Slider = (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    function logging() {
        // console.log('log!');
    }

    const getSomeImages = useCallback(() => {
        // console.log('fetching');
    
        return [
            'https://i.ytimg.com/vi/6RWYN6kqa2k/maxresdefault.jpg',
            'https://sun1-16.userapi.com/s/v1/if1/2sAP4hlPTKiFdA6_T1DgMeC17gW0ZJLtezFH9AoTW5mksRU8pV_KmK7STYqEJMh6Pw6TFAOt.jpg?size=400x0&quality=96&crop=71,71,2017,2017&ava=1',
        ]
    }, [slide]);

    useEffect(() => {
        // console.log('effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);   
        }
    }, [slide]);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);
    }

    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);
    
    return (
        <Container>
            <div className="slider w-50 m-auto">


                {/* <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" /> */}
                
                {/* {   
                    getSomeImages().map((url, i) => {
                        return (
                            <img className="d-block w-100" src={url} key={i} width={'200px'}/>
                        )
                    })
                }
                 */}

                 <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div className="text-center mt-5">Total slide: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}
                        >-1
                        </button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}
                        >+1
                        </button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}
                        >toggle autoplay
                        </button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img className="d-block w-100" src={url} key={i} width={'200px'}/>)}
        </>
    )
}


function App(props) {

    const [slider, setSlider] = useState(true);
  return (
        <div className="app">
            <button onClick={() => setSlider(false)}>Click</button>
           {slider? <Slider/>: null}
        </div>
        
  );
}

export default App;
