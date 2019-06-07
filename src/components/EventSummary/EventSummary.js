
import React, {Fragment} from 'react'
import styles from './EventSummary.module.css';

const Eventsummary = props => {
  return (
    <Fragment>
      <div className={styles.Title}>{props.name}</div>
      <div className={styles.Date}>{props.startDate}</div>
      <div className={styles.Time}>{props.startTime} - {props.endTime}</div>
    </Fragment>
  )
}

export default Eventsummary