import React from 'react';
import { View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';
import CreateAccountTopSection from '../../../molecules/CreateAccountTopSection';

class CreateAccounPage extends React.Component {
  static propTypes = {
    createAccountAction: PropTypes.func,
    labels: {},
  };

  static defaultProps = {
    createAccountAction: () => {},
    labels: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(payload) {
    const { createAccountAction } = this.props;
    createAccountAction(payload);
  }

  render() {
    const { labels } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
        <View>
          <CreateAccountTopSection labels={labels} />
          <CreateAccountForm labels={labels} handleSubmitForm={this.handleSubmitForm} />
        </View>
      </ScrollView>
    );
  }
}

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
