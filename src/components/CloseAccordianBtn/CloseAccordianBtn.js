import React from 'react'
import styles from './CloseAccordianBtn.module.css';

const CloseAccordianBtn = ({close,color}) => {
  return (
    <button type='button' onClick={close} className={[styles.CloseAccordianBtn, styles[color]].join(' ')} >▲</button>
  )
}

export default CloseAccordianBtn