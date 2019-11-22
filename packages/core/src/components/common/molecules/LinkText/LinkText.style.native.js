import styled from 'styled-components/native';
import { Image } from '../../atoms';

export const StyledImage = styled(Image)`
  width: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
  height: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export default {
  StyledImage,
};
