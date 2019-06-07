import React from 'react'
import renderer from 'react-test-renderer'
import Loadingspinner from '.'

it('Loadingspinner: default', () => {
  const component = renderer.create(<Loadingspinner />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
