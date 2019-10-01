import React from 'react'
import styles from './MyBookingsListItem.module.css';
import { connect } from 'react-redux';
import getMarkup from '../../util/getMarkup';
import decodeText from '../../util/decodeText';

import {convertTime, convertDate} from '../../util/helpers';

const MyBookingsListItem = props => {
  const {event = {},authId} = props

  const gm = event.bookings ? event.bookings.filter(booking => booking.bookingComment)[0] : null
  const owner = (gm && gm.id === authId) ? <span className={styles.Owner}>({gm.bookingComment})</span> : null
  
  return (
    <li className={styles.MyBookingsListItem}>
      <div className={styles.EventNameWrapper}>{ owner } <span className={styles.EventName} dangerouslySetInnerHTML={getMarkup(decodeText(event.eventName))}/></div>
      <span className={styles.EventSystem} dangerouslySetInnerHTML={getMarkup(decodeText(event.eventSystem))}/>
      
      <div className={styles.TimeWrapper} >
          <div className={styles.Date}>{convertDate(event.eventStartDate, "ddd, Do")}</div>
          <div className={styles.Time}>{convertTime(event.eventStartTime)}&ndash;{convertTime(event.eventEndTime)}</div>
          {(event.metadata && event.metadata.room) ? <div className={styles.Room}>Room: {event.metadata.room}</div> : null}
      </div>  
    </li>
  )
}

const mapStateToProps = ({events,auth}, ownProps) => {
  return {
      event: events.eventsById[ownProps.eventId],
      authId: auth.userData.id
  }
}

export default connect(mapStateToProps)(MyBookingsListItem)