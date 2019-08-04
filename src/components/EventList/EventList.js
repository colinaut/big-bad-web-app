
import React, {useState} from 'react'
import styles from './EventList.module.css';
import Event from '../Event';
import EventsFilter from '../EventsFilter';
import uuid from 'react-uuid';

const Eventlist = props => {

  const [currentFilters, setCurrentFilters] = useState({categories: "all",days:"all", favs:false});

  // Setting up all the Filter buttons
  // Need to double check that the categories are right. Better if I grabbed categories from server.
  // NOTE: that this is specific for 2019. Likely need to set all the dates up to be dynamic somehow.
  const [filterButtons, setFilterButtons] = useState([
    {
      name: "categories",
      label: "Categories",
      buttons: [
        {
          slug:"all",
          name:"All",
          click:()=>showAll("categories"),
          active: true
        },
        {
          slug:"rpg",
          name:"RPG",
          click:()=>filterCategories("rpg"),
          active: false
        },
        {
          slug:"larp",
          name:"LARP",
          click:()=>filterCategories("larp"),
          active: false
        },
        {
          slug:"playtest",
          name:"Playtest",
          click:()=>filterCategories("playtest"),
          active: false
        },
        {
          slug:"all-ages",
          name:"All Ages",
          click:()=>filterCategories("all-ages"),
          active: false
        },
        {
          slug:"board-game",
          name:"Board/Card Game",
          click:()=>filterCategories("board-game"),
          active: false
        },
        {
          slug:"workshop",
          name:"Workshop",
          click:()=>filterCategories("workshop"),
          active: false
        },
        {
          slug:"volunteer-shift",
          name:"Volunteer Shift",
          click:()=>filterCategories("volunteer-shift"),
          active: false
        }
      ]
    },
    {
      name: "days",
      label: "Day",
      buttons: [
        {
          slug: "all",
          name:"All",
          click:()=>showAll("days"),
          active: true
        },
        {
          slug:"2019-10-10",
          name:"Thu",
          click:()=>filterEvents("eventStartDate","2019-10-10"),
          active: false
        },
        {
          slug:"2019-10-11",
          name:"Fri",
          click:()=>filterEvents("eventStartDate","2019-10-11"),
          active: false
        },
        {
          slug:"2019-10-12",
          name:"Sat",
          click:()=>filterEvents("eventStartDate","2019-10-12"),
          active: false
        },
        {
          slug:"2019-10-13",
          name:"Sun",
          click:()=>filterEvents("eventStartDate","2019-10-13"),
          active: false
        }
      ]
    },
    {
      name: "favs",
      label: false,
      buttons: [
        {
          slug: "favs",
          name:"Favs",
          click:() => filterFavs(),
          active: false
        }
      ]
    }
  ]);

  //NOTE Really should refactor all the filter click code to be more DRY
  const filterEvents = (name,filter) => {
    setCurrentFilters({...currentFilters, days:filter});

    setFilterButtons(prevState => prevState.map(panel => {
      if (panel.name === "days") {
        const resetButtons = panel.buttons.map(button => button.slug === filter ? {...button, active: true} : {...button, active: false})
        return {...panel, buttons: resetButtons}
      } else {
        return panel
      }
    }))
  }

  const filterCategories = (filter) => {
    setCurrentFilters({...currentFilters, categories:filter});

    setFilterButtons(prevState => prevState.map(panel => {
      if (panel.name === "categories") {
        const resetButtons = panel.buttons.map(button => button.slug === filter ? {...button, active: true} : {...button, active: false})
        return {...panel, buttons: resetButtons}
      } else {
        return panel
      }
    }))
  }
  
  const filterFavs = () => {
    setCurrentFilters(prevState => { return {...currentFilters, favs:!prevState.favs}});
    setFilterButtons(prevState => prevState.map(panel => {
      if (panel.name === "favs") {
        const resetButtons = panel.buttons.map((button) => { 
          if (button.slug === "favs") {
            return {...button, active: !button.active}
          } else {
            return {...button, active: !button.active}
          }
        })
        return {...panel, buttons: resetButtons}
      } else {
        return panel
      }
    }))
  }

  const showAll = (panelName) => {
    setCurrentFilters({...currentFilters, [panelName]:"all"});
 
    setFilterButtons(filterButtons => filterButtons.map(panel => {
        if (panel.name === panelName) {
          const resetButtons = panel.buttons.map(button => button.slug === "all" ? {...button, active: true} : {...button, active: false})
          return {...panel, buttons: resetButtons}
        } else {
          return panel
        }
      })
    )
  }
  
  return (
    <div className={styles.EventlistWrapper}>
      <EventsFilter buttonPanel={filterButtons}/>

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

export default Eventlist