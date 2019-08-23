import React from 'react'
import styles from './EventsFilter.module.css';
import { connect } from 'react-redux';

const EventsFilter = props => {
  const {buttonPanel,authStatus} = props
  
  return buttonPanel ? (
    <div className={styles.Eventsfilter}>
      {buttonPanel.map((panel)=>{
        return (!authStatus && panel.authOnly) ? null : <ButtonPanel panel={panel} key={panel.keyId}/>;
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

const mapStateToProps = ({auth}) => {
  return {
      authStatus: auth.authStatus,
  }
}

export default connect(mapStateToProps)(EventsFilter)