import React from 'react'
import renderer from 'react-test-renderer'
import Pagetitle from '.'

it('Pagetitle: default', () => {
  const component = renderer.create(<Pagetitle />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
