
import React, {useState, useEffect} from 'react'
import styles from './EventList.module.css';
import Event from '../Event';
import EventsFilter from '../EventsFilter';
import uuid from 'react-uuid';
import {transformObjectToArray} from '../../util/helpers';
import {convertDate} from '../../util/helpers';

const EventList = props => {

  const {categories, dates} = props;

  const [currentFilters, setCurrentFilters] = useState({categories: "all",dates:"all", favs:false});

  // Setting up all the Filter buttons
  const [filterButtons, setFilterButtons] = useState({
    categories: {
      label: "Categories",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
        ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})]
    },
    dates: {
      label: "Day",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('dates','all'), active: true }, 
        ...dates.map(d => { return {slug:d, name: convertDate(d,'ddd'), click: ()=>filterList("dates",d),active:false}})] 
    },
    favs: { //TODO only show faves to logged in users
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "favs",
          name:"Favs",
          click:() => filterFavs(),
          active: false
        }
      ]
    }
  });

  useEffect(()=>{  //TODO: change filter buttons when categories change
    const categoryButtons = [
      { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
      ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})] 

    setFilterButtons(prevState => { 
      return {...prevState, categories:{...prevState.categories, buttons:categoryButtons }}
    })
  },[categories])

  useEffect(()=>{  //TODO: change filter buttons when categories change
    const dateButtons = [
      { slug:"all", name:"All", click:()=>filterList('dates','all'), active: true }, 
      ...dates.map(d => { return {slug:d, name: convertDate(d,'ddd'), click: ()=>filterList("dates",d),active:false}})] 

    setFilterButtons(prevState => { 
      return {...prevState, dates:{...prevState.dates, buttons:dateButtons }}
    })
  },[dates])

  const filterList = (type,filter) => {
    setCurrentFilters(prevState => { return {...prevState, [type]:filter}});

    setFilterButtons(prevState => { 
      const resetButtons = prevState[type].buttons.map(button => button.slug === filter ? {...button, active: true} : {...button, active: false})
      return {...prevState, [type]:{...prevState[type], buttons:resetButtons }}
    });
  }

  const filterFavs = () => {
    setCurrentFilters(prevState => { return {...prevState, favs:!prevState.favs}});

    setFilterButtons(prevState => { 
      return {...prevState, favs:{...prevState.favs, buttons:[{slug: "favs", name:"Favs", click:() => filterFavs(), active: !prevState.favs.buttons.active}]}}
    });
    
  }
  
  return (
    <div className={styles.EventlistWrapper}>
      <EventsFilter buttonPanel={transformObjectToArray(filterButtons)}/>

      <div className={styles.Eventlist}>
        {props.events.map((event) => (
          
          <Event 
            key={event.eventId + uuid()}
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
            filters={currentFilters}
            />
        ))}
      </div>
    </div>
  )
}

EventList.defaultProps = {
  categories: [],
  dates: []
}

export default EventList