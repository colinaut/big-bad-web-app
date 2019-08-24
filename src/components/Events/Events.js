import { connect } from 'react-redux';
import React, {useEffect} from 'react';
import unixTime from 'unix-time';

import * as actions from '../../store/actions';
import EventList from '../EventList';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

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

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      {sortedEventsArray ? <EventList dates={dates} categories={categories} sortedEventsArray={sortedEventsArray} events={props.events} /> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      categories: events.categories,
      dates: events.dates,
      sortedEventsArray: events.sortedEventsArray,
      epochtime: events.epochtime, //TODO: Get epochtime working so that it grabs new event data if it's been a while. Or sort this out via persist
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(actions.fetchEvents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)