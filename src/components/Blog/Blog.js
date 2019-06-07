
import React from 'react'
import styles from './Blog.module.css';
import { connect } from 'react-redux';

const getMarkup = (markup) => {return {__html: markup};}

const Blog = props => {
  
  const posts = props.blog.map((post) => {
          return (
            <div className={styles.Post} key={post.id}>
              <h3 className={styles.PostTitle} dangerouslySetInnerHTML={getMarkup(post.title.rendered)}/>
              <div className={styles.Excerpt} dangerouslySetInnerHTML={getMarkup(post.excerpt.rendered)}/>
            </div>
          )}
        )

  return (
    <div className={styles.Blog}>
      <h2>Blog</h2>
      {props.blog ? posts : "loading"}
    </div>
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