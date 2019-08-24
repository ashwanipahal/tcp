import styled from 'styled-components/native';
import BodyCopy from '../../../atoms/BodyCopy';

export const StyledTile = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`
export const BodyCopyWithMEDMargin = styled(BodyCopy)`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`


export default StyledTile;
