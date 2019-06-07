
import React from 'react'
import styles from './Blog.module.css';
import { connect } from 'react-redux';
import Card from '../Card'

const getMarkup = (markup) => {return {__html: markup};}

const Blog = props => {
  
  const posts = props.blog.map((post) => {
          return (
            <Card key={post.id}>
              <div className={styles.Post} >
                <h3 className={styles.PostTitle} dangerouslySetInnerHTML={getMarkup(post.title.rendered)}/>
                <div className={styles.Excerpt} dangerouslySetInnerHTML={getMarkup(post.excerpt.rendered)}/>
              </div>
            </Card>
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