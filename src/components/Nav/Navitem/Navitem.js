
import React from 'react'
import styles from './Navitem.module.css';
import { NavLink } from "react-router-dom";
import getMarkup from '../../../util/getMarkup'

const Navitem = props => {
  return (
    <li className={styles.Navitem}><NavLink to={props.section.path} onClick={props.close} dangerouslySetInnerHTML={getMarkup(props.section.title)}/></li>
  )
}

export default Navitem