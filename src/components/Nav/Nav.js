import React from 'react'
import styles from './Nav.module.css';

const Nav = props => {
  return (
    <nav className={styles.Nav}>
      <ul className={styles.NavList}>{props.children}</ul>
    </nav>
  )
}

export default Nav