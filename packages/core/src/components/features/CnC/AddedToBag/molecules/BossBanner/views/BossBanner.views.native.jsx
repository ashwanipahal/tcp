import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { StyledHeading, SubHeading, MainWrapper } from '../styles/BossBanner.style.native';

const getItemLabel = labels => {
  return `${labels.simplyChooseText.replace('#type', `${labels.noRushText}`)}`;
};
const BossBanner = ({ labels }) => {
  return (
    <MainWrapper>
      <StyledHeading>
        <BodyCopy
          fontSize="fs12"
          fontWeight={['semibold']}
          textAlign="center"
          text={labels.pickUpText}
        />
      </StyledHeading>
      <SubHeading>
        <BodyCopy fontSize="fs10" textAlign="center" text={getItemLabel(labels)} />
      </SubHeading>
    </MainWrapper>
  );
};
BossBanner.propTypes = {
  labels: PropTypes.shape,
};
BossBanner.defaultProps = {
  labels: {},
};
export default withStyles(BossBanner);
export { BossBanner as BossBannerVanilla };
