import React from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';

const EventBooking = props => {
  return (
    <div className={styles.EventBooking}>
      <h3>Event Booking</h3>
    </div>
  )
}

const mapStateToProps = ({events, auth}) => {
  return {
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)