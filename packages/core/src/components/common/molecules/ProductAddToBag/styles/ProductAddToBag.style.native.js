import styled, { css } from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => (props.isOutfitPage ? '0' : props.theme.spacing.LAYOUT_SPACING.SM)};
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${getAdditionalStyle};
`;

export const SizeViewContainer = styled.View`
  position: relative;
`;

export default styles;
