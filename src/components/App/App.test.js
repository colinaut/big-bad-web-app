import React from 'react'
import renderer from 'react-test-renderer'
import App from '.'

it('App: default', () => {
  const component = renderer.create(<App />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
