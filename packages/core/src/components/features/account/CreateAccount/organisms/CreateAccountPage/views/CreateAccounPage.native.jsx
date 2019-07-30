import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';

const CreateAccounPage = props => {
  const { labels } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateAccountTopSection labels={labels} />
        <CreateAccountForm labels={labels} />
      </ScrollView>
    </View>
  );
};

CreateAccounPage.propTypes = {
  labels: PropTypes.shape({}),
};

CreateAccounPage.defaultProps = {
  labels: {},
};

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
