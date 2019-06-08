
import React from 'react'
import styles from './PageTitle.module.css';

const Pagetitle = props => {
  return (
    <h2 className={styles.Pagetitle}>{props.title}</h2>
  )
}

export default Pagetitle