import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import moment from 'moment'

import * as actions from '../../store/actions';
import EventList from '../EventList';
import PageTitle from '../PageTitle';
import ProgressBar from '../ProgressBar'
import styles from './Events.module.css';

const Events = props => {

  const {
    sortedEventsByDate,
    fetchEvents,
    epochtime,
  } = props;

  useEffect(()=>{
    if (!sortedEventsByDate || (sortedEventsByDate && sortedEventsByDate.length < 1)) {fetchEvents()}
  },[sortedEventsByDate,fetchEvents])

  const currentTime = moment(new Date()).valueOf()

  useEffect(()=>{
    if (epochtime && epochtime + 3600000 < currentTime ) {
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
      {sortedEventsByDate ? <EventList /> : <ProgressBar color='teal' percentage={progress} />}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
    sortedEventsByDate: events.sortedEventsByDate,
    eventsById: events.eventsById,
    epochtime: events.epochtime, 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)