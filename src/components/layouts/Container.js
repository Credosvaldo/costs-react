import style from './Container.module.css'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Company from '../pages/Company'
import NewProject from '../pages/NewProjects'

function Container(props) {
    
    return (
        <div className={`${style.container} ${style[props.customClass]}`}> {props.children} </div>
    )
}

export default Container