import { connect } from 'react-redux';
import React, {useEffect} from 'react'
import unixTime from 'unix-time';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

import styles from './Events.module.css';

const Events = props => {

  const {events,epochtimePublic,epochtimeAuth,authStatus,fetchEventsPublic,fetchEvents,fetchEventsSince,fetchEventsSincePublic} = props;

  const currentTime = unixTime(new Date() - 10) // minus ten seconds so that it doesn't reload instantly

  useEffect(()=>{
    if (authStatus) {
      if (!events || (events && events.length < 1)) {fetchEvents()}
      if (epochtimeAuth < currentTime) {fetchEventsSince({epochtime:epochtimeAuth})}
    } else {
      if (!events || (events && events.length < 1)) {fetchEventsPublic()}
      if (epochtimePublic < currentTime) {fetchEventsSincePublic({epochtime:epochtimePublic})}
    }
    
  },[authStatus,events,fetchEventsPublic,fetchEvents,fetchEventsSince,fetchEventsSincePublic,epochtimeAuth,epochtimePublic,currentTime])

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      <button onClick={props.authStatus ? props.fetchEvents : props.fetchEventsPublic}>Reload Events</button>
      {props.events ? <EventList events={props.events} /> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      events: events.events,
      epochtimePublic: events.epochtimePublic,
      epochtimeAuth: events.epochtimeAuth,
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsPublic: () => dispatch(actions.fetchEventsPublic()),
    fetchEvents: () => dispatch(actions.fetchEvents()),
    fetchEventsSincePublic: (payload) => dispatch(actions.fetchEventsSincePublic(payload)),
    fetchEventsSince: (payload) => dispatch(actions.fetchEventsSince(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)