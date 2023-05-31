import { act, render, screen } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom';

import { MicroFrontend } from "./Microfrontend";

describe(MicroFrontend.name, () => {
 const mountCallback = () => {
  return {onParentNavigate: jest.fn()}
 }
 const unmountCallback = jest.fn();
 const props = {
  microfrontend: {
    componentId: 'test-component-id',
    path: '/test',
    mountCallback,
    unmountCallback
  }
 }
 it('renders', async () => {
  await act(() => {
    render(<MicroFrontend {...props} />);
  });

  expect(screen.queryByTestId(props.microfrontend.componentId)).toBeInTheDocument()
 });
});