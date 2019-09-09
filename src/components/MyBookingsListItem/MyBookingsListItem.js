import React from 'react'
import styles from './MyBookingsListItem.module.css';
import { connect } from 'react-redux';
import getMarkup from '../../util/getMarkup';

import {convertTime, convertDate} from '../../util/helpers';

const MyBookingsListItem = props => {
  const {event = {},authId} = props

  const gm = event.bookings ? event.bookings.filter(booking => booking.bookingComment)[0] : null
  const owner = (gm && gm.id === authId) ? <span className={styles.Owner}>({gm.bookingComment})</span> : null

  //TODO: Get delete booking working and add game room
  
  return (
    <li className={styles.MyBookingsListItem}>
      <span className={styles.EventName} dangerouslySetInnerHTML={getMarkup(event.eventName)}/>
      { owner }
      <div className={styles.TimeWrapper} >
          <div className={styles.Date}>{convertDate(event.eventStartDate)}</div>
          <div className={styles.Time}>{convertTime(event.eventStartTime)} - {convertTime(event.eventEndTime)}</div>
      </div>
      {(event.metadata && event.metadata.room) ? <div className={styles.Room}>Room: {event.metadata.room}</div> : null}
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