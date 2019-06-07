
import React from 'react'
import styles from './Pagewrapper.module.css';

const Pagewrapper = props => {
  return (
    <div className={styles.Pagewrapper}>{props.children}</div>
  )
}

export default Pagewrapper