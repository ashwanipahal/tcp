import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../atoms/index';
import { Wrapper, StyledAnchor, StyledCol } from '../HelpTabs.style';

const HelpTabs = props => {
  const { className, buttonList } = props;
  return (
    <Wrapper className={className}>
      {buttonList &&
        buttonList.map((button, index) => {
          const { label, url } = button;
          return (
            <StyledCol key={index.toString()}>
              <StyledAnchor url={url} fullWidth>
                <BodyCopy
                  component="div"
                  color="gray.900"
                  fontFamily="secondary"
                  fontWeight="semibold"
                  fontSize="fs16"
                  textAlign="center"
                >
                  {label}
                </BodyCopy>
              </StyledAnchor>
            </StyledCol>
          );
        })}
    </Wrapper>
  );
};

HelpTabs.propTypes = {
  buttonList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
};
HelpTabs.defaultProps = {
  className: '',
};

export default HelpTabs;
export { HelpTabs as VanillaHelpTabs };
