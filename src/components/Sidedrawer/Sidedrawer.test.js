import React from 'react'
import renderer from 'react-test-renderer'
import Sidedrawer from '.'

it('Sidedrawer: default', () => {
  const component = renderer.create(<Sidedrawer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
