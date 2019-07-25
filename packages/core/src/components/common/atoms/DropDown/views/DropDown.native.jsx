import React from 'react';
import { Image, View, FlatList, Modal, Dimensions } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '../../../hoc/withStyles.native';
import {
  style,
  Row,
  OverLayView,
  HeaderContainer,
  DropDownItemContainer,
  Separator,
  StyledTouchableOpacity,
} from '../DropDown.style.native';

const downIcon = require('../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../assets/carrot-small-up.png');

// @flow
type Props = {
  data: Array,
  selectedValue: string,
  onValueChange: () => void,
  containerStyle: Object,
};

class DropDown extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.rowFrame = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };

    this.dropDownFrame = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };

    const { data, selectedValue } = this.props;
    const selectedObject = data.filter(item => {
      return item.value === selectedValue;
    });

    this.state = {
      dropDownIsOpen: false,
      selectedLabelState: selectedObject[0].label,
    };
  }

  openDropDown = () => {
    this.setState({
      dropDownIsOpen: true,
    });
  };

  dropDownLayout = ({ item }) => {
    return (
      <DropDownItemContainer onStartShouldSetResponder={() => this.onDropDownItemClick(item)}>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          textAlign="center"
          color="gray.800"
          fontWeight="black"
          text={item.label}
        />
      </DropDownItemContainer>
    );
  };

  onDropDownItemClick = item => {
    this.setState({
      dropDownIsOpen: false,
      selectedLabelState: item.label,
    });

    // pass the callback here with value
    const { onValueChange } = this.props;
    onValueChange(item.value);
  };

  closeDropDown = () => {
    this.setState({
      dropDownIsOpen: false,
    });
  };

  findRowDimensions = () => {
    if (this.rowMarker) {
      this.rowMarker.measure((x, y, width, height, pageX, pageY) => {
        this.rowFrame = { x: pageX, y: height + pageY, w: width, h: height };
      });
    }
  };

  findDropDownDimensions = () => {
    if (this.overlayMarker) {
      this.overlayMarker.measure((x, y, width, height, pageX) => {
        const dimensions = Dimensions.get('window');
        const windowHeight = dimensions.height;

        const bottomSpace = windowHeight - this.rowFrame.y - this.rowFrame.h;
        const showInBottom = bottomSpace >= height || bottomSpace >= this.rowFrame.y;

        const topMargin = {
          top: showInBottom ? this.rowFrame.y : Math.max(0, this.rowFrame.y - height),
        };
        this.dropDownFrame = { x: pageX, y: topMargin.top, w: width, h: height };
        // this.overlayMarker.setNativeProps({
        //   style: {
        //     top: topMargin.top,
        //   },
        // });
      });
    }
  };

  render() {
    const { data, containerStyle } = this.props;
    const { dropDownIsOpen, selectedLabelState } = this.state;
    return (
      <View style={containerStyle}>
        <Row
          {...this.props}
          onStartShouldSetResponder={() => this.openDropDown()}
          ref={ref => {
            this.rowMarker = ref;
          }}
          onLayout={() => this.findRowDimensions()}
        >
          <HeaderContainer>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              textAlign="center"
              color="gray.800"
              fontWeight="black"
              text={selectedLabelState}
            />
          </HeaderContainer>
          <Image source={dropDownIsOpen ? upIcon : downIcon} />
        </Row>
        <Modal visible={dropDownIsOpen} transparent>
          <StyledTouchableOpacity
            accessibilityTraits="none"
            accessibilityComponentType="none"
            onPress={this.closeDropDown}
            activeOpacity={1}
            style={{
              width: this.rowFrame.w,
              left: this.rowFrame.x,
              top: this.dropDownFrame.y,
            }}
          >
            <OverLayView
              style={containerStyle}
              ref={ref => {
                this.overlayMarker = ref;
              }}
              onLayout={() => this.findDropDownDimensions()}
            >
              {dropDownIsOpen && (
                <FlatList
                  data={data}
                  renderItem={item => this.dropDownLayout(item)}
                  ItemSeparatorComponent={() => <Separator />}
                />
              )}
            </OverLayView>
          </StyledTouchableOpacity>
        </Modal>
      </View>
    );
  }
}

export default withStyles(DropDown, style);
export { DropDown as DropDownVanilla };
