/**
 * @author Michael Citro
 * @summary very basic error handler. For now we will just not render the button if it fails.
 */

import errorBoundary from '../../../../../../common/hoc/withErrorBoundary';

class PayPalButtonErrorBoundary {
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default errorBoundary(PayPalButtonErrorBoundary);
