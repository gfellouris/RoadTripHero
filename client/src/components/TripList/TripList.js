import React from 'react';
import { Table } from 'reactstrap';
import TripRow from "./index.js";
import API from "../Utils/API.js";
// import GlobalContext from '../../context/'

export default class TripList extends React.Component {
    // static contextType = GlobalContext

    state = {
        tripPlans: []
    };

    componentDidMount() {
        this.loadTrips();
    }

    loadTrips = () => {
        API.getTrips()
          .then(res => this.setState({ tripPlans: res.data }))
          .catch(err => console.log(err));
      };
    render() {
        // console.log(this.context.user.uid)
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Saved Trips</th>
                    </tr>
                </thead>
                {this.state.tripPlans.map(tripPlans => (
                    <TripRow
                        id={tripPlans.id}
                        tripName={tripPlans.tripName}
                        origin={tripPlans.origin}
                        destination={tripPlans.destination}
                    />
                ))}
            </Table>
        );
    }
}
