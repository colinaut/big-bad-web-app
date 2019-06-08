import React from 'react'
import renderer from 'react-test-renderer'
import Favstar from '.'

it('Favstar: default', () => {
  const component = renderer.create(<Favstar />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
