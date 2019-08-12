import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import withStyles from '../../../hoc/withStyles';
import {
  styles,
  TitleContainer,
  CardContainer,
  ModalContainer,
} from '../styles/CouponListSection.style.native';
import BodyCopy from '../../../atoms/BodyCopy';

export class CouponListSection extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  toggleShow = event => {
    event.preventDefault();
    this.setState(prevState => ({
      showMore: !prevState.showMore,
    }));
  };

  helpAnchorClick = event => {
    event.preventDefault();
    const { helpAnchorClick } = this.props;
    helpAnchorClick();
  };

  render() {
    const {
      labels,
      couponList,
      className,
      heading,
      helpSubHeading,
      couponDetailClick,
      onApply,
      onRemove,
      dataLocator,
    } = this.props;
    const { showMore } = this.state;
    const buttonText =
      showMore === true ? labels.LESS_MORE_BUTTON_TEXT : labels.SHOW_MORE_BUTTON_TEXT;
    const couponListFilter = showMore === true ? couponList : couponList.slice(0, 5);
    return (
      <View>
        <TitleContainer>
          {couponList.size > 0 && (
            <BodyCopy
              fontSize="fs16"
              fontWeight="extrabold"
              text={`${heading} (${couponList.size})`}
            />
          )}
        </TitleContainer>
        <CardContainer>
          <Text>cardlist</Text>
        </CardContainer>
        <ModalContainer>
          <Text>Modal</Text>
        </ModalContainer>
      </View>
    );
  }
}

CouponListSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(CouponListSection, styles);
export { CouponListSection as CouponListSectionVanilla };
