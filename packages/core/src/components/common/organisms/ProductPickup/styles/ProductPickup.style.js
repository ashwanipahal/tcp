import { css } from 'styled-components';

const styles = css`
  .shipping-text-section {
    display: inline-block;
    padding-left: 20px;
  }
  .pickup-header {
    border: 1px solid ${props => props.theme.colorPalette.gray[1300]};
    padding: 16px;
  }
  .title-pickup-section {
    display: flex;
  }
  .pickup-content {
    min-height: 112px;
    border: 1px solid ${props => props.theme.colorPalette.gray[1300]};
    border-top: none;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media ${props => props.theme.mediaQuery.large} {
      min-height: 68px;
      flex-direction: row;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .button-find-in-store {
      flex-basis: 40%;
      align-self: flex-end;
      max-height: 42px;
    }
    .sub-header-pickup {
      display: inline;
      padding-left: 12px;
    }
  }
  .pickup-section {
    display: flex;
  }
  .pickup-details {
    padding-left: 18px;
  }
  .store-name {
    padding-bottom: 3px;
  }
  .availability {
    padding: 0 12px 7px 0;
  }
  .pickup-info {
    padding-bottom: 14px;
  }
  .change-store-link {
    padding-left: 12px;
  }
  .pickup-sub-container {
    margin-bottom: 24px;
  }
  .pickup-icon {
    align-self: flex-start;
  }
  .error-pickup-info {
    padding-top: 8px;
  }
`;
export default styles;
