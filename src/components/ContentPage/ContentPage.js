import { connect } from 'react-redux';
import React, {useEffect} from 'react'

import * as actions from '../../store/actions';
import getMarkup from '../../util/getMarkup';
import PageTitle from '../PageTitle';
import LoadingSpinner from '../LoadingSpinner';

import styles from './ContentPage.module.css';

const ContentPage = props => {
  const {
    id,
    title,
    page,
    fetchPage
  } = props

  useEffect(()=>{
    if (!page) {fetchPage(id)}
  },[page,fetchPage,id])

  return (
    <div className={styles.ContentPage}>
      <PageTitle><span dangerouslySetInnerHTML={getMarkup(title)} /></PageTitle>
      {page ? <div className={styles.Content} dangerouslySetInnerHTML={getMarkup(page.content.rendered)}></div> : <LoadingSpinner/>}
    </div>
  )
}

const mapStateToProps = ({pages}, ownProps) => {
  return {
      page: pages.pages ? pages.pages[ownProps.id] : null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPage: (id) => dispatch(actions.fetchPage(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContentPage)