
import React from 'react'
import styles from './PageTitle.module.css';

const PageTitle = props => {
  return (
    <h1 className={styles.PageTitle}>{props.children}</h1>
  )
}

export default PageTitle