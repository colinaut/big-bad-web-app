
import React from 'react'
import styles from './Blog.module.css';
import { connect } from 'react-redux';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner';
import Post from '../Post';
import PageTitle from '../PageTitle'

const Blog = props => {
  
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

export default connect( mapStateToProps )(Blog)