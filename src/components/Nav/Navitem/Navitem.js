
import React from 'react'
import styles from './Navitem.module.css';
import { NavLink } from "react-router-dom";

const Navitem = props => {
  return (
    <li className={styles.Navitem}><NavLink to={props.section.path} onClick={props.close}>{props.section.title}</NavLink></li>
  )
}

export default Navitem