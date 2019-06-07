
import React from 'react'
import styles from './Events.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Card from '../Card';
import EventSummary from '../EventSummary';
import Auth from '../Auth'

const Events = props => {

  const eventsList = props.events.map((event) => {
    return (
      <Card key={event.eventId}>
        <EventSummary 
          name={event.eventName} 
          startDate={event.eventStartDate}
          endDate={event.eventEndDate}
          startTime={event.eventStartTime}
          endTime={event.eventEndTime}
          description={event.postContent}
          categories={event.categories}
          eventOwner={event.eventOwner}
          metaData={event.metadata}
           />
      </Card>
    )
  })

  return (
    <div className={styles.Events}>
      <h2>Events</h2>
      <Auth/>
      {props.events ? eventsList : "loading..."}
    </div>
  )
}

const mapStateToProps = state => {
  return {
      events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)