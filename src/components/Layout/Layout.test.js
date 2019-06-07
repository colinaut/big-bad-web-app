import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '.'

it('Layout: default', () => {
  const component = renderer.create(<Layout />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
