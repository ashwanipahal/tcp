/**
 * @author Michael Citro
 * @summary This is used when we need to know if the component as mounted on the browser.
 *          We can not rely on window flag due to Client Hydration errors. The Child of this
 *          Component should NOT overwrite the componentDidMount funciton.
 */
import React from 'react';
import { isClient, isTouchClient } from '@tcp/core/src/utils';

export default class ServerToClientRenderPatch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasTouchClient: false, // NodeJs will render First, we will not know if its touch client or not
      hasBrowserClient: false, // NodeJs will render First, we will not know if its Browser client or Node JS
    };
  }

  componentDidMount() {
    const { hasTouchClient, hasBrowserClient } = this.state;
    if (isClient() && !hasBrowserClient) {
      if (isTouchClient() && !hasTouchClient) {
        this.setState({ hasTouchClient: true, hasBrowserClient: true });
      } else {
        this.setState({ hasBrowserClient: true });
      }
    }
  }

  render() {
    return <div />;
  }
}
