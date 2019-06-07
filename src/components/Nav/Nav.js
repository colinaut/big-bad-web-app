import React from 'react'
import styles from './Nav.module.css';
import Navitem from './Navitem'

const Nav = props => {
  return (
    <nav className={styles.Nav}>
      <ul className={styles.NavList}>
        {props.sections.map((section, i) => <Navitem key={i} section={section} close={props.close}/>)}
      </ul>
    </nav>
  )
}

export default Nav