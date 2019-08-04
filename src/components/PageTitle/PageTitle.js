
import React from 'react'
import styles from './PageTitle.module.css';

const Pagetitle = props => {
  return (
    <h2 className={styles.Pagetitle}>{props.children}</h2>
  )
}

export default Pagetitle