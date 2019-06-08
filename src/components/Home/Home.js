
import React from 'react'
import styles from './Home.module.css';
import PageTitle from '../PageTitle'

const Home = props => {
  return (
    <div className={styles.Home}>
      <PageTitle title="Big Bad Con"/>
      <p>October 10-13th 2019</p>
    </div>
  )
}

export default Home