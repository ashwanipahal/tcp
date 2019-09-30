import styled from 'styled-components';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XS};
  background-color: ${props => props.theme.colors.WHITE};
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;
