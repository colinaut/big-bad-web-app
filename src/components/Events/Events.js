import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import unixTime from 'unix-time';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import PageTitle from '../PageTitle';
import ProgressBar from '../ProgressBar'
import styles from './Events.module.css';

const Events = props => {

  const {
    sortedEventsArray,
    categories,
    dates,
    fetchEvents,
    epochtime,
  } = props;

  useEffect(()=>{
    if (!sortedEventsArray || (sortedEventsArray && sortedEventsArray.length < 1)) {fetchEvents()}
  },[sortedEventsArray,fetchEvents])

  const currentTime = unixTime(new Date())

  useEffect(()=>{
    if (epochtime && epochtime + 3600 < currentTime ) {
      fetchEvents()
    }
  },[epochtime, currentTime, fetchEvents])

  const [progress, setProgress] = useState(1)
  
  useEffect(() => { //Progress Bar animation
    var interval
    var intervalTime = 150 + Math.floor((Math.random() * 150) + 1);

    if (!sortedEventsArray) {
      interval = setInterval(() => {
        intervalTime = 150 + Math.floor((Math.random() * 150) + 1);
        setProgress(prevState => prevState + 1)
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [sortedEventsArray]);

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      <p className={styles.Test}>Admin Testing: 
        <button onClick={()=> props.fetchEventsSince({epochtime:epochtime })}>grab new stuff</button> 
        <button onClick={()=> props.fetchEventsSince({epochtime:'1546321746'})}>grab all this year</button>
        <button onClick={()=> props.fetchEventsCount()}>fetch events count</button>
      </p>
      
      {sortedEventsArray ? <EventList dates={dates} categories={categories} sortedEventsArray={sortedEventsArray} events={props.events} /> : <ProgressBar color='teal' percentage={progress} />}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      categories: events.categories,
      dates: events.dates,
      sortedEventsArray: events.sortedEventsArray,
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
    fetchEventsCount: () => dispatch(actions.fetchEventsCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)