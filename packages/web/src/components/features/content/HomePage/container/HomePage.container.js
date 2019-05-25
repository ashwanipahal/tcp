import React, { Fragment } from 'react';
import {connect} from "react-redux";
import { getHeaderlinks } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

const HomePageContainer = ({links}) => (<HomePageView links={links}/>)

HomePageContainer.getInitActions = () => [ 
    getHeaderlinks()
]

const mapStateToProps = (state) => {
    return {
        links: state.HomePageReducer.links,
        eSpots: state.HomePageReducer.eSpots 
    }
}

export default connect(mapStateToProps)(HomePageContainer);