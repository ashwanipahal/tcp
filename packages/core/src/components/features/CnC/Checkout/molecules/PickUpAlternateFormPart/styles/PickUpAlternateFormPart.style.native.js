import styled, { css } from 'styled-components/native';

const Style = css``;

const AlternateWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

const FieldWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ShortNote = styled.View`
  position: relative;
  top: 0px;
  left: ${props =>
    props.Platform.OS === 'android' ? `-${props.theme.spacing.ELEM_SPACING.XXS}` : '0px'};
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;
const TextColOne = styled.View`
  flex: 1;
`;
const TextColTwo = styled.View`
  flex: 8;
`;

const AlternateFieldWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.SM};
`;

export {
  Style,
  AlternateWrapper,
  FieldWrapper,
  ShortNote,
  TextWrapper,
  TextColOne,
  TextColTwo,
  AlternateFieldWrapper,
};
