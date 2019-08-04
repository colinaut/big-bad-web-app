import { connect } from 'react-redux';
import React, {useEffect} from 'react'

import * as actions from '../../store/actions';
import Auth from '../Auth';
import EventList from '../EventList';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';

import styles from './Events.module.css';

const Events = props => {

  const AuthLoad = ({auth}) => {
    if (!auth) {
      return <Auth/>
    } else {
      return <p>Logged in</p>
    }
  }

  const {events,fetchEventsPublic} = props;
  
  useEffect(()=>{
    if (!events) {fetchEventsPublic()}
  },[events,fetchEventsPublic])

  return (
    <div className={styles.Events}>
      <PageTitle>Events</PageTitle>
      <AuthLoad events={props.events} auth={props.authStatus}/>
      {props.events ? <EventList events={props.events} /> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({auth,events}) => {
  return {
      events: events.events,
      authStatus: auth.authStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsPublic: () => dispatch(actions.fetchEventsPublic())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)