
import { connect } from 'react-redux';
import React, {useEffect} from 'react'

import * as actions from '../../store/actions';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner';
import PageTitle from '../PageTitle';
import Post from '../Post';

import styles from './Blog.module.css';

const Blog = props => {
  
  const {blog,fetchBlog} = props;

  useEffect(()=>{
    if (!blog) {fetchBlog()}
  },[blog,fetchBlog])

  return (
    <div className={styles.Blog}>
      <PageTitle>Blog</PageTitle>
      <DisplayPosts posts={props.blog}/>
    </div>
  )
}

const DisplayPosts = ({posts}) => {
  return (posts && posts.length) ? (
    <div className={styles.PostsList}>
      {posts.map((post) => (
        <Card key={post.id}>
          <Post 
            id={post.id}
            titleHTML={post.title.rendered}
            excerptHTML={post.excerpt.rendered}
            contentHTML={post.content.rendered} 
            date={post.date}
            />
        </Card>
      ))}
    </div>
  ) : (
    <LoadingSpinner />
  )
}

const mapStateToProps = ({blog}) => {
  return {
      blog: blog.blog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBlog: () => dispatch(actions.fetchBlog())
  }
}

export default connect( mapStateToProps,mapDispatchToProps )(Blog)