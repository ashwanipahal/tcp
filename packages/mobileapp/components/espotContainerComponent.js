import React from 'react';
import {
  WebView,
} from 'react-native';
import fetchData  from '@tcp/core/src/service/API';
import { endpoints } from '@tcp/core/src/service/endpoint';
import HTML from 'react-native-render-html';

export class EspotContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }

    componentDidMount = () => {
      fetchData("https://test2.childrensplace.com","/api/getESpot", {
        method: 'get',
        'espotname': 'LOYAL_MiniBagMSpot',
        'catalogId':10551,
        'langId': -1,
        'storeId':10151,
        'devicetype':'desktop',
        header: {
          espotName: 'LOYAL_MiniBagMSpot',
          deviceType: 'desktop',
          type: 'content',
          'Cache-Control': 'no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0
        },
      }, 'get').then((res)=> {
        this.setState({
          data: res.body.List[0].maketingText
        });
      }).catch(err => {
        console.log("Error in API");
        console.log(err);
      });
    }

    render() {
        return(
            <HTML html={this.state.data}></HTML>
        )
    }
}