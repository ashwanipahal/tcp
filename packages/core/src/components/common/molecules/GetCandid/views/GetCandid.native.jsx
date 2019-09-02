import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Text } from 'react-native';

class GetCandid extends React.PureComponent {
  static propTypes = {
    fetchCandidData: PropTypes.func,
  };

  static defaultProps = {
    fetchCandidData: () => {},
  };

  componentDidMount() {
    const { fetchCandidData } = this.props;
    fetchCandidData();
  }

  render() {
    return (
      <Fragment>
        <Text>Get Candid Module.</Text>
      </Fragment>
    );
  }
}

export default GetCandid;
export { GetCandid as GetCandidVanilla };
