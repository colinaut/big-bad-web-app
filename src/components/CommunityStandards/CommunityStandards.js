import { connect } from 'react-redux';
import React, {useEffect} from 'react'

import * as actions from '../../store/actions';
import getMarkup from '../../util/getMarkup';
import PageTitle from '../PageTitle';
import LoadingSpinner from '../LoadingSpinner';

import styles from './CommunityStandards.module.css';

const CommunityStandards = props => {

  const {
    page,
    fetchPage
  } = props

  useEffect(()=>{
    if (!page) {fetchPage(1068)}
  },[page,fetchPage,])

  return (
    <div className={styles.CommunityStandards}>
      <PageTitle>Community Standards</PageTitle>
      {page ? <div className={styles.Content} dangerouslySetInnerHTML={getMarkup(page.content.rendered)}></div> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({pages}) => {
  return {
      page: pages.pages ? pages.pages[1068] : null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPage: (id) => dispatch(actions.fetchPage(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommunityStandards)