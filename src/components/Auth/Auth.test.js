import React from 'react'
import renderer from 'react-test-renderer'
import Auth from '.'

it('Auth: default', () => {
  const component = renderer.create(<Auth />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
