import { css } from 'styled-components';

const styles = css`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  }
`;

export default styles;
