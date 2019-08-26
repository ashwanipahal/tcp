import React, { Component, useLayoutEffect } from 'react';
import { bool, string, node } from 'prop-types';

export default function Script({ async, src, ...props }) {
  useLayoutEffect(() => {
    const script = Object.assign(document.createElement('script'), { async, src }, props);
    document.head.appendChild(script);
  }, []);

  return null;
}

Script.propTypes = {
  async: bool,
  src: string.isRequired,
};

Script.defaultProps = {
  async: true,
};

class ScriptErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Script component error', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? null : children;
  }
}

ScriptErrorBoundary.propTypes = {
  children: node.isRequired,
};

export function ScriptWithErrorBoundary(props) {
  return (
    <ScriptErrorBoundary>
      <Script {...props} />
    </ScriptErrorBoundary>
  );
}
