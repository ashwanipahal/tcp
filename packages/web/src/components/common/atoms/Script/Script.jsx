import { useLayoutEffect } from 'react';
import { bool, string } from 'prop-types';

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
