import React from 'react'
import renderer from 'react-test-renderer'
import Post from '.'

it('Post: default', () => {
  const component = renderer.create(<Post />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
