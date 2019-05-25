import React from 'react';
//import PlpPage from "../inside_core/components/plpPage/views/plpPagecomponent"
//import PlpPage from "../../core/components/plpPage/views/plpPagecomponent";
import PlpPage from "@tcp/core/components/plpDeltaSync/views/plpPagecomponent";

export default class Plp extends React.Component {

    render () {
        return(
            <React.Fragment>
                <PlpPage></PlpPage>
            </React.Fragment>
        )
    }
}