import React from 'react'
import styles from './EventBooking.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Button from '../Button'

const EventBooking = props => {

  const {id,myEvents} = props

  const players = props.metadata.find(data => data.metaKey === 'Players').metaValue

  console.log(id,myEvents)

  return props.bookings ? (
    <div className={styles.EventBooking}>
      <h3 className={styles.Heading}>Event Bookings</h3>
      <div>Bookings: {props.bookings.length - 1} of {players}</div>
      {(myEvents.includes(id)) ? 
        <div className={styles.Booked}><p>You are booked into this event!</p><Button clicked={()=> props.unbookMeFromGame(id)}>Book Event</Button></div> 
        : <Button clicked={()=> props.bookMeIntoGame(id)}>Book Event</Button> }
    </div>
  ) : null
}

const mapStateToProps = ({events, auth}, ownProps) => {
  return {
      authStatus: auth.authStatus,
      bookings: events.eventsById[ownProps.id].bookings,
      metadata: events.eventsById[ownProps.id].metadata,
      myEvents: auth.myEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bookMeIntoGame: (id)=> dispatch(actions.bookMeIntoGame(id)),
    unbookMeFromGame: (id) => dispatch(actions.unbookMeFromGame(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventBooking)