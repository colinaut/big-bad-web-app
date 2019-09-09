import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import unixTime from 'unix-time';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import PageTitle from '../PageTitle';
import ProgressBar from '../ProgressBar'
import styles from './Events.module.css';
import {transformObjectToArray} from '../../util/helpers';

const Events = props => {

  const {
    sortedEventsByDate,
    fetchEvents,
    epochtime,
    isAdmin,
  } = props;

  useEffect(()=>{
    if (!sortedEventsByDate || (sortedEventsByDate && sortedEventsByDate.length < 1)) {fetchEvents()}
  },[sortedEventsByDate,fetchEvents])

  const currentTime = unixTime(new Date())

  useEffect(()=>{
    if (epochtime && epochtime + 3600 < currentTime ) {
      fetchEvents()
    }
  },[epochtime, currentTime, fetchEvents])

  const [progress, setProgress] = useState(1)

  useEffect(() => { //Progress Bar animation TODO: get this working with event count so that it is more dynamic in how it animates. Right now it just based on current run time
    var interval
    var intervalTime = 150 + Math.floor((Math.random() * 150) + 1);

    if (!sortedEventsByDate) {
      interval = setInterval(() => {
        intervalTime = 150 + Math.floor((Math.random() * 150) + 1);
        setProgress(prevState => prevState + 1)
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [sortedEventsByDate]);

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      {isAdmin ? <p className={styles.Test}>Admin Testing: 
        <button onClick={()=> props.fetchEventsSince({epochtime:epochtime })}>get events since last load</button> 
        <button onClick={()=> props.fetchEventsSince({epochtime:'1546321746'})}>get all events this year</button>
        <button onClick={()=> props.fetchEvents()}>get all events</button>
        <button onClick={()=> props.sortEvents(transformObjectToArray(props.eventsById))}>sort events</button>
      </p> : null}
      
      {sortedEventsByDate ? <EventList /> : <ProgressBar color='teal' percentage={progress} />}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
    sortedEventsByDate: events.sortedEventsByDate,
    eventsById: events.eventsById,
    epochtime: events.epochtime, 
    authStatus: auth.authStatus,
    isAdmin: auth.isAdmin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents()),
    fetchEventsSince: (payload) => dispatch(actions.fetchEventsSince(payload)),
    fetchMyAvailableGameSlots: () => dispatch(actions.fetchMyAvailableGameSlots()),
    fetchEventsCount: () => dispatch(actions.fetchEventsCount()),
    fetchFavEvents: () => dispatch(actions.fetchFavEvents()),
    sortEvents: (events) => dispatch(actions.sortEvents(events))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)