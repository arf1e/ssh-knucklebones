import React, { ErrorInfo, PropsWithChildren } from 'react';
import { noop } from '../utils/noop';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode | React.ReactNode[] }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    noop(error);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    noop(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}
