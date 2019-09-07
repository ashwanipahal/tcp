import styled, { css } from 'styled-components/native';

const Style = css`
  width: 100%;
`;

const ModalContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

const ModalHeading = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

const PickupEditHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const EditAnchor = styled.View`
  margin-left: 44px;
  font-size: ${props => props.theme.typography.fontSizes.fs12};
`;

export { Style, ModalContainer, ModalHeading, PickupEditHeader, EditAnchor };
