import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';

import LineStyle from '../line.style.native';

/**
 * @param {string} props : props for LineComp
 * @return {JSX} LineComp : Return jsx line component
 * @desc This method draw HR line
 */
const LineComp = props => {
  return <LineStyle {...props} />;
};

LineComp.propTypes = {
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
};

LineComp.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
  borderWidth: 0.65,
  borderColor: null,
};

export default withStyles(LineComp);
export { LineComp as LineCompVanilla };
