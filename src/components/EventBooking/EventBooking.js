import React from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';

const EventBooking = props => {

  const players = props.metadata.find(data => data.metaKey === 'Players').metaValue

  return (
    <div className={styles.EventBooking}>
      <h3 className={styles.Heading}>Event Bookings</h3>
      <div>Bookings: {props.bookings.length - 1} of {players}</div>
    </div>
  )
}

const mapStateToProps = ({events, auth}, ownProps) => {
  return {
      authStatus: auth.authStatus,
      bookings: events.eventsById[ownProps.id].bookings,
      metadata: events.eventsById[ownProps.id].metadata
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)