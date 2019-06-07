
import React from 'react'
import styles from './Navitem.module.css';

const Navitem = props => {
  return (
    <li className={styles.Navitem}>{props.children}</li>
  )
}

export default Navitem