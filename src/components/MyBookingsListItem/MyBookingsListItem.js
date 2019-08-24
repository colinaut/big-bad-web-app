import React from 'react'
import styles from './MyBookingsListItem.module.css';
import { connect } from 'react-redux';
import getMarkup from '../../util/getMarkup'

const MyBookingsListItem = props => {
  const {event,authId} = props

  const owner = (event.eventOwner && event.eventOwner.id === authId) ? <span className={styles.Owner}>(Your Event)</span> : null

  //TODO: Get delete booking working and add game room
  
  return (
    <li className={styles.MyBookingsListItem}>
      <span className={styles.EventName} dangerouslySetInnerHTML={getMarkup(event.eventName)}/>
      { owner }
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