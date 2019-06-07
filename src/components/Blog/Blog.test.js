import React from 'react'
import renderer from 'react-test-renderer'
import Blog from '.'

it('Blog: default', () => {
  const component = renderer.create(<Blog />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
