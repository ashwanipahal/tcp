# Development Setup

### Please see a following confluence page for configuration: https://childrensplace.atlassian.net/wiki/spaces/RDP/pages/735478742/Deployment+and+Folder+Structure

## How to run

1. At the root folder run `yarn install`
2. Change folder to the mobile app => `cd packages/mobileapp`
3. Create a wml link for the core package `wml add ../core ./node_modules/@tcp/core`
4. Start wml `wml start`
5. Run the mobile app eg. `react-native run-ios`

You may need to delete `ios` and `android` folders and run `react-native eject`
You might also need to run `react-native link react-native-gesture-handler`
