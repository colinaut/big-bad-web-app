import React from 'react'
import renderer from 'react-test-renderer'
import CommunityStandards from '.'

it('CommunityStandards: default', () => {
  const component = renderer.create(<CommunityStandards />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
