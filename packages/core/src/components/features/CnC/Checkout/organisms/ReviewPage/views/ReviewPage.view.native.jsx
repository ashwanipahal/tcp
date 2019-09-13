import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import style from '../styles/ReviewPage.style.native';
import CONSTANTS from '../../../Checkout.constants';

const { Container } = style;

class ReviewPage extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    submitReview: PropTypes.func.isRequired,
    availableStages: PropTypes.func.isRequired,
  };

  render() {
    const { navigation, labels, submitReview, availableStages } = this.props;

    const { header, backLinkBilling, nextSubmitText } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="billing"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView>
          <Container>
            <CheckoutSectionTitleDisplay title={header} />
          </Container>
          <CnCTemplate
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={submitReview}
            backLinkText={backLinkBilling}
            onBackLinkPress={() =>
              navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_REVIEW)
            }
          />
        </ScrollView>
      </>
    );
  }
}

export default ReviewPage;

export { ReviewPage as ReviewPageVanilla };
