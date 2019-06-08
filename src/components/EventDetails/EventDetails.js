
import React from 'react'
import styles from './EventDetails.module.css';
import getMarkup from '../../util/getMarkup';

const Eventdetails = props => {
  return (
    <div className={styles.Eventdetails} onClick={props.click}>
      <div className={styles.Description} dangerouslySetInnerHTML={getMarkup(props.description)} />
      <div className={styles.Meta}>
        <span><strong>GM:</strong> {props.meta.GM}</span>
        <span><strong>Players:</strong> {props.meta.Players}</span>
        <span><strong>Length:</strong> {props.meta.Length} hrs</span>
      </div>
    </div>
  )
}

export default Eventdetails