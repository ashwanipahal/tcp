import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import {
  Styles,
  SubTotalLine,
  HeadingLabel,
  SubHeadingLabel,
  DescriptionLabel,
  RemainingPlccLabel,
  ShowSubTotalWrapper,
  CurrentTotalWrapper,
  SubTotalLabel,
  SubTotalValue,
  EstimatedSubTotalWrapper,
  EstimatedSubTotalLabel,
  EstimatedSubTotalValue,
} from '../styles/GuestMprPlccSection.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const GuestMprPlccSection = props => {
  const {
    labels,
    headingLabel,
    subHeadingLabel,
    descriptionLabel,
    remainingPlcc,
    showSubtotal,
    getCurrencySymbol,
    currentSubtotal,
    estimatedSubtotal,
  } = props;
  return (
    <View>
      {headingLabel && (
        <HeadingLabel>
          <BodyCopy
            mobilefontFamily={['secondary']}
            textAlign="center"
            fontWeight="extrabold"
            fontSize="fs12"
            color="black"
            text={headingLabel}
          />
        </HeadingLabel>
      )}
      {subHeadingLabel && (
        <SubHeadingLabel>
          <BodyCopy
            mobilefontFamily={['secondary']}
            textAlign="center"
            fontWeight="extrabold"
            fontSize="fs18"
            text={subHeadingLabel}
          />
        </SubHeadingLabel>
      )}
      {descriptionLabel && (
        <DescriptionLabel>
          <BodyCopy
            mobilefontFamily={['secondary']}
            textAlign="center"
            fontWeight="extrabold"
            fontSize="fs12"
            color="black"
            text={descriptionLabel}
          />
        </DescriptionLabel>
      )}
      {remainingPlcc && (
        <RemainingPlccLabel>
          <BodyCopy
            mobilefontFamily={['secondary']}
            textAlign="center"
            fontWeight="extrabold"
            fontSize="fs12"
            color="black"
            text={remainingPlcc}
          />
        </RemainingPlccLabel>
      )}
      {showSubtotal && (
        <ShowSubTotalWrapper>
          <SubTotalLine />
          <CurrentTotalWrapper>
            <SubTotalLabel>
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs12"
                text={labels.currentSubtotal}
              />
            </SubTotalLabel>
            <SubTotalValue>
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs14"
                text={getCurrencySymbol}
              />
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs14"
                text={currentSubtotal}
              />
            </SubTotalValue>
          </CurrentTotalWrapper>
          <EstimatedSubTotalWrapper>
            <EstimatedSubTotalLabel>
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="semibold"
                fontSize="fs12"
                text={labels.estimatedSubtotal}
              />
            </EstimatedSubTotalLabel>
            <EstimatedSubTotalValue>
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="extrabold"
                fontSize="fs16"
                text={getCurrencySymbol}
              />
              <BodyCopy
                mobilefontFamily={['secondary']}
                fontWeight="extrabold"
                fontSize="fs16"
                text={estimatedSubtotal}
              />
            </EstimatedSubTotalValue>
          </EstimatedSubTotalWrapper>
          <SubTotalLine />
        </ShowSubTotalWrapper>
      )}
    </View>
  );
};

GuestMprPlccSection.propTypes = {
  headingLabel: PropTypes.string,
  labels: PropTypes.shape.isRequired,
  subHeadingLabel: PropTypes.string,
  descriptionLabel: PropTypes.string,
  remainingPlcc: PropTypes.string,
  showSubtotal: PropTypes.bool,
  getCurrencySymbol: PropTypes.string,
  currentSubtotal: PropTypes.number,
  estimatedSubtotal: PropTypes.string,
};

GuestMprPlccSection.defaultProps = {
  headingLabel: '',
  subHeadingLabel: '',
  descriptionLabel: '',
  remainingPlcc: '',
  showSubtotal: false,
  getCurrencySymbol: '',
  currentSubtotal: 0,
  estimatedSubtotal: '',
};

export default withStyles(GuestMprPlccSection, Styles);
export { GuestMprPlccSection as GuestMprPlccSectionVanilla };
