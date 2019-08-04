
import React from 'react'
import styles from './EventsFilter.module.css';

const EventsFilter = props => {
  
  return props.buttonPanel ? (
    <div className={styles.Eventsfilter}>
      {props.buttonPanel.map((panel)=>{
        return <ButtonPanel panel={panel} key={panel.keyId}/>
      })}
    </div>
  ) : null
}

const ButtonPanel = (props) => {
  return (
    <div className={styles.Panel} key={props.name}>
      {props.panel.label ? <h4 className={styles.PanelLabel}>{props.panel.label}</h4> : null}
      {props.panel.buttons.map((button)=>{
        return <FilterButton key={button.name} click={button.click} name={button.name} active={button.active} />
      })}
    </div>
  )
}

const FilterButton = (props) => {
  return <button className={`${styles.FilterButton} ${props.active ? styles.On : styles.Off} ${props.name === 'Favs' ? styles.Favs : null}`} onClick={props.click}>{props.name}</button>
}

export default EventsFilter