import {useFormik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import './findHero.scss';


const SucsessFind = ({data}) => {
    return (
        <div className="hero-sucsess">
            <div className="hero-sucsess-name">`There is! Visit {data.name} page?`</div>
            <Link className="hero-sucsess-link" to={`/character/${data.id}`}>To page</Link>
        </div>
        
    )
}

const NotFind = () => {
    return (
        <div className="hero-error">
            The character was not found. Check the name and try again
        </div>
    )
}

// export default FindHero;


const FindHero = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState({})
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const formik = useFormik({
        initialValues: {
            name: name,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3,'Минимум два символа').required('Обязательное поле'),
        }), // сюда впиздюрили валидацию
        onSubmit: (values) => {
            setData({})
            getCharacterByName(values.name)
            .then(res => {
                if (res) {
                    console.log(res);
                    setData({id: res.id, name: res.name, })
                } else {
                    setData({error: true})
                }
                })
            .catch(er => console.log(er))

        setName('');
        },
    });

    return (
        <form className="find-hero" onSubmit={formik.handleSubmit}>
            <div>
                <label className="find-hero-label" htmlFor="name">Or find a character by name:</label>
                <input 
                    className="find-hero-input"
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <button className="find-hero-btn" type="submit" onSubmit={formik.onSubmit}>Find</button>
            {formik.errors.name && formik.touched.name? <div style={{color: 'red'}}>{formik.errors.name}</div>: null}
            {data.name ? <SucsessFind data={data}/> : null}
            {data.error ? <NotFind/>: null}
        </form>
    )
}

export default FindHero;