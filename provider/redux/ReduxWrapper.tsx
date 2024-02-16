'use client';

import {Provider} from 'react-redux';
import {ReactNode} from 'react';

import {store} from './store';

interface ReduxWrapperProps {
  children: ReactNode;
}

const ReduxWrapper = ({children}: ReduxWrapperProps) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxWrapper;
