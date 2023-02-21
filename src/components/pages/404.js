import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";


const Page404 = () => {

    return (
        <div>
            <ErrorMessage/>
            <p>Вы попали на не существующую страницу.</p>
            <Link 
            style={{'color': 'red', 'textAlign': 'center'}}
            to='/'>Go back </Link>
        </div>
    )
}
export default Page404;