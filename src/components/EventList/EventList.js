
import React, {useState, useEffect} from 'react'
import styles from './EventList.module.css';
import Event from '../Event';
import EventsFilter from '../EventsFilter';
import uuid from 'react-uuid';
import {transformObjectToArray, dynamicSort} from '../../util/helpers';
import {convertDate} from '../../util/helpers';
import { ReactComponent as D6 } from '../../assets/die-6.svg'
import { ReactComponent as Star } from '../../assets/star.svg';

const EventList = props => {

  const {
    categories = [], 
    dates = [],
    sortedEventsArray = []
  } = props;

  const [currentFilters, setCurrentFilters] = useState({categories: 'all',dates: 'all', availability:false, favs:false});

  // Setting up all the Filter buttons
  const [filterButtons, setFilterButtons] = useState({
    categories: {
      priority: 0,
      label: "Category",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
        ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})]
    },
    dates: {
      priority: 1,
      label: "Day",
      buttons: [
        { slug:"all", name:"All", click:()=>filterList('dates','all'), active: true }, 
        ...dates.map(d => { return {slug:d, name: convertDate(d,'ddd'), click: ()=>filterList("dates",d),active:false}})] 
    },
    availability: {
      priority: 2,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "open",
          name:"Open",
          icon: D6,
          click:() => filterToggle('availability'),
          active: false
        }
      ]
    },
    favs: { 
      priority: 3,
      label: false,
      authOnly: true,
      buttons: [
        {
          slug: "favs",
          name:"Favs",
          icon: Star,
          click:() => filterToggle('favs'),
          active: false
        }
      ]
    }
  });

  useEffect(()=>{  //change categories filter buttons when categories change
    const categoryButtons = [
      { slug:"all", name:"All", click:()=>filterList('categories','all'), active: true }, 
      ...categories.map(c => { return {slug:c.slug, name: c.name, click: ()=>filterList("categories",c.slug),active:false}})] 

    setFilterButtons(prevState => { 
      return {...prevState, categories:{...prevState.categories, buttons:categoryButtons }}
    })
  },[categories])

  useEffect(()=>{  //change date filter buttons when categories change
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

  const filterToggle = (type) => {
    setCurrentFilters(prevState => { return {...prevState, [type]:!prevState[type]}});

    setFilterButtons(prevState => { 
      const resetButtons = prevState[type].buttons.map(button => { return {...button, active: !button.active} })
      return {...prevState, [type]:{...prevState[type], buttons:resetButtons }}
    });
  }
  
  return (
    <div className={styles.EventlistWrapper}>
      <EventsFilter buttonPanel={transformObjectToArray(filterButtons).sort(dynamicSort('priority'))}/>
      <div className={styles.Eventlist}>
        {sortedEventsArray.map(id => (
          <Event 
            key={id + uuid()}
            id={id}
            filters={currentFilters}
            />
        ))}
      </div>
    </div>
  )
}

export default EventList