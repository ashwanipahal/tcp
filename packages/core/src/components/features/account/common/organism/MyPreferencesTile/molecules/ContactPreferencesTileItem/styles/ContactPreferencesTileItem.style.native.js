import styled from 'styled-components/native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

const ContactPreferencesTileItemContainer = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ImageWrapper = styled.View`
margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const LeftContainer = styled.View`
  flex: 4,
  flex-direction: 'row';
  justify-content: 'flex-start';
`;

const MiddleContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export {
  ContactPreferencesTileItemContainer,
  LeftContainer,
  RightContainer,
  MiddleContainer,
  ImageWrapper
};
