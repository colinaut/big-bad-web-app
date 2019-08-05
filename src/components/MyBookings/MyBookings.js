import React from 'react'
import styles from './MyBookings.module.css';
import { connect } from 'react-redux';
import MyBookingsListItem from '../MyBookingsListItem'

const MyBookings = props => {
  const {myEvents} = props;

  return (
    <div className={styles.MyBookings}>
      <h4 className={styles.Header}>My Bookings</h4>
      { (myEvents && myEvents.length > 0) ? 
        <ul className={styles.List}> 
          {myEvents.map( eventId => <MyBookingsListItem key={eventId} eventId={eventId}/>)}
        </ul>
      : <p>No events booked yet!</p> }
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {
      myEvents: auth.myEvents
  }
}

export default connect(mapStateToProps)(MyBookings)