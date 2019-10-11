import React, {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input,  } from 'reactstrap';
import "./Forms.css";
import API from '../Utility/API';


export default class Forms extends Component {
  state = {
    tripName: '',
    startPoint: '',
    startPointCity: '',
    startPointState: '',
    startPointZip: '',
    endPoint: '',
    endPointCity: '',
    endPointState: '',
    endPointZip: '',
    numberOfStops: ''
  }
 
  handleInputChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const origin = `${this.state.startPoint} ${this.state.startPointCity} ${this.state.startPointState} ${this.state.startPointZip}`;
    const destination =`${this.state.endPoint} ${this.state.endPointCity} ${this.state.endPointState} ${this.state.endPointZip}`
    
    const objectToSend = {
      userid: this.props.user.id,
      tripname: this.state.tripName,
      origin: origin,
      destination: destination,
      numberofstops: parseInt(this.state.numberOfStops)
    }

    API.saveTrip(objectToSend).then(res => {
      this.props.loadTrips(this.props.user)
    }).catch(err => console.log(err))

  }

  render() {
    return (
      <Form className="tripInput" onSubmit={this.handleSubmit}>
        <h1>Plan Your Trip Here!</h1>
        <Row form>
          <Col md={6}>
            <FormGroup className="name">
              <Label for="exampleTrip" className="title">Trip Name</Label>

              <Input type="text" name="tripName" onChange={this.handleInputChange} id="exampleTrip" placeholder="Your Trip Name:"/>

            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleStart" className="title">Start Point</Label>

          <Input type="text" name="startPoint" onChange={this.handleInputChange} id="exampleStart" placeholder="1234 Main St"/>

         
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity" className="title">City</Label>
              <Input type="text" name="startPointCity" onChange={this.handleInputChange} id="exampleCity" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleState" className="title">State</Label>
              <Input type="text" name="startPointState" onChange={this.handleInputChange} id="exampleState" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleZip" className="title">Zip</Label>
              <Input type="text" name="startPointZip" onChange={this.handleInputChange} id="exampleZip" />
            </FormGroup>  
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleEnd" className="title">End Point</Label>
          <Input type="text" name="endPoint" onChange={this.handleInputChange} id="exampleEnd" placeholder="4567 Main St" />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEndCity" className="title">City</Label>
              <Input type="text" name="endPointCity" onChange={this.handleInputChange} id="exampleCity" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleEndState" className="title">State</Label>
              <Input type="text" name="endPointState" onChange={this.handleInputChange} id="exampleState" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleEndZip" className="title">Zip</Label>
              <Input type="text" name="endPointZip" onChange={this.handleInputChange} id="exampleZip" />
            </FormGroup>  
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleStops"className="title">Stops</Label>
              <Input onChange={this.handleInputChange} type="number" name="numberOfStops" id="exampleStops"/>
            </FormGroup>
          </Col>
        </Row>
        <Button className="submit">Save Your Trip!</Button>
      </Form>
    );
  }
}