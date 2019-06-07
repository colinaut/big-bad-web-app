import React from 'react'
import renderer from 'react-test-renderer'
import Games from '.'

it('Games: default', () => {
  const component = renderer.create(<Games />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
