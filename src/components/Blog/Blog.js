
import React from 'react'
import styles from './Blog.module.css';
import { connect } from 'react-redux';
import Card from '../Card';
import LoadingSpinner from '../LoadingSpinner';
import Post from '../Post'

const Blog = props => {
  
  return (
    <div className={styles.Blog}>
      <h2>Blog</h2>
      <DisplayPosts posts={props.blog}/>
    </div>
  )
}

const DisplayPosts = ({posts}) => {
  return posts.length ? (
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

const mapStateToProps = state => {
  return {
      blog: state.blog
  }
}

export default connect(
  mapStateToProps
)(Blog)