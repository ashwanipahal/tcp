import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import withStyle from '../../../../common/hoc/withStyles';
import style from '../styles/EmptyBagPage.style';
import { BodyCopy, Anchor } from '../../../../common/atoms';
import { getLocator } from '../../../../../utils';
import {
  StyledEmptyBag,
  ViewBagButton,
  StyledSupportMsg,
} from '../styles/EmptyBagPage.style.native';

class EmptyBagPage extends React.PureComponent {
  render() {
    const { isUserLoggedIn, bagLabels, openModalApplyNowModal, ...otherProps } = this.props;
    const { navigation, isBagPageSflSection } = otherProps;

    if (isBagPageSflSection) {
      return (
        <StyledEmptyBag>
          <Text>
            <BodyCopy
              fontSize="fs14"
              fontFamily="secondary"
              dataLocator={getLocator('empty_bag_Msg')}
              text={bagLabels.emptySflMsg1}
            />
          </Text>
          <Text>
            <BodyCopy
              fontSize="fs14"
              fontFamily="secondary"
              dataLocator={getLocator('empty_bag_Msg')}
              text={bagLabels.emptySflMsg2}
            />
          </Text>
        </StyledEmptyBag>
      );
    }
    return (
      <StyledEmptyBag>
        <Text>
          <BodyCopy
            className="large-size-message"
            color="gray.900"
            fontWeight="extrabold"
            fontSize="fs16"
            fontFamily="secondary"
            dataLocator={getLocator('empty_bag_Msg')}
            text={!isUserLoggedIn ? bagLabels.guestUserMsg : bagLabels.loggedInMsg}
          />
        </Text>
        <Anchor
          text="Apply Now"
          underline
          fontSizeVariation="large"
          onPress={() => openModalApplyNowModal({ isModalOpen: true })}
        />
        <ViewBagButton
          onPress={() => {
            navigation.navigate(!isUserLoggedIn ? 'LoginPageContainer' : 'Home');
          }}
        >
          <BodyCopy
            textTransform="uppercase"
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs13"
            text={!isUserLoggedIn ? bagLabels.login : bagLabels.shopNow}
          />
        </ViewBagButton>
        <Text>
          <BodyCopy
            className="large-size-message"
            color="gray.900"
            fontWeight="extrabold"
            fontFamily="secondary"
            dataLocator={getLocator('empty_bag_recommendation_msg')}
            text={bagLabels.tagLine}
          />
        </Text>
        <StyledSupportMsg>
          <BodyCopy
            dataLocator={getLocator('empty_bag_recommendation_msg')}
            className="small-spacing"
            fontFamily="secondary"
            text={bagLabels.helperMsg}
          />
        </StyledSupportMsg>
      </StyledEmptyBag>
    );
  }
}

EmptyBagPage.defaultProps = {
  isBagPageSflSection: false,
};

EmptyBagPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  bagLabels: PropTypes.bool.isRequired,
  isBagPageSflSection: PropTypes.bool,
  openModalApplyNowModal: PropTypes.func.isRequired,
};

export default withNavigation(withStyle(EmptyBagPage, style));
export { EmptyBagPage as EmptyBagPageVanilla };
