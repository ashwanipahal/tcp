import styled from 'styled-components/native';

import BodyCopy from '../../../atoms/BodyCopy';

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  align-items: center;
`;

export const Container = styled.View`
  width: 100%;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  align-items: center;
`;

export const TextBoxContainer = styled.View`
  width: 100%;
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  padding-top: ${props => props.paddingTop || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
  padding-right: ${props => props.paddingRight || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
`;

export const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export default {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
};
