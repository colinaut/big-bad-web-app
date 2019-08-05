import React from 'react'
import styles from './MyBookingsListItem.module.css';
import { connect } from 'react-redux';
import getMarkup from '../../util/getMarkup'

const MyBookingsListItem = props => {
  const {event} = props
  return (
    <li className={styles.MyBookingsListItem}>
      <span className={styles.EventName} dangerouslySetInnerHTML={getMarkup(event.eventName)}/>
    </li>
  )
}

const mapStateToProps = ({events}, ownProps) => {
  return {
      event: events.eventsById[ownProps.eventId]
  }
}

export default connect(mapStateToProps)(MyBookingsListItem)