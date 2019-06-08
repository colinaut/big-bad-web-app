
import React, {useState} from 'react'
import styles from './Events.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Card from '../Card';
import Event from '../Event';
import Auth from '../Auth';
import LoadingSpinner from '../LoadingSpinner';

const Events = props => {

  const [filteredEvents, setEvents] = useState(props.events);

  const favsFilterToggle = () => {
    setEvents(filteredEvents.filter(item => "2257" !== item.eventId))
  }

  return props.authStatus ? (
    <div className={styles.Events}>
      <h2>Events</h2>
    
      <DisplayEvents events={filteredEvents}/>
    </div>
  ) : (
    <div className={styles.Events}>
      <h2>Events</h2>
      <Auth/>
    </div>
  )
}

const DisplayEvents = ({events}) => {
  return events.length ? (
    <div className={styles.EventsList}>
      {events.map((event) => (
        <Card key={event.eventId}>
          <Event 
            id={event.eventId}
            name={event.eventName} 
            startDate={event.eventStartDate}
            endDate={event.eventEndDate}
            startTime={event.eventStartTime}
            endTime={event.eventEndTime}
            description={event.postContent}
            categories={event.categories}
            eventOwner={event.eventOwner}
            metadata={event.metadata}
            />
        </Card>
      ))}
    </div>
  ) : (
    <LoadingSpinner />
  )
}

const mapStateToProps = state => {
  return {
      events: state.events,
      authStatus: state.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)