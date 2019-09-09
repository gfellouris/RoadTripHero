import React, { Component } from "react";
import TripList from "../components/TripList/TripList.js";
import { Col, Row, Container } from "../components/Grid/index.js";

import GlobalContext from '../context/'
import Navbar from '../components/Navbar/index.js'

import "../pages/planner.css"

class Planner extends Component {
    static contextType = GlobalContext

    render() {
        // console.log(this.GlobalContext.user.uid)
        return (
            <>
                <Navbar />
                <Container fluid>

                    <TripList
                        user={this.context.user} >
                    </TripList>

                </Container>
                {/* <Container fluid>
                <Row >
                    <Col size="md-6">
                        <TripList> 
                        </TripList>
                    </Col>
                </Row>
            </Container> */}
            </>
        )
    }
};

export default Planner;