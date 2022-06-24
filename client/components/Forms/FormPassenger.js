import React from 'react';
import { Form, Button, Select, Spin, Input } from 'antd';
import { findTrips, newPassenger } from '../../services/main.js';
import { modalNotification } from '../commons/Notifications.js';

const mapCitiesToSelectOptions = (cities) => {
    return cities.map((city) => {
        return { 
            label: city.name, 
            value: city._id 
        }
    })
}

const mapTripsToSelectOptions = (trips) => {
    return trips.map((trip) => {
        return { 
            label: trip.departure_time, 
            value: trip._id 
        }
    })
}

class FormPassenger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            isSearched: false,
            trips: [],
            isSelected: false,
        };
        this.findTripsFormRef = React.createRef();
        this.selectTripFormRef = React.createRef();
    }

    onFindTrip = async values => {
        //Cosas a chequear:
        //
        //
        if ( values.departure_city == values.arrival_city ){
            modalNotification("error", "The both cities cant be the same.");
        }
        else {
            try {
                this.setState({ isSearching: true });
                const trips = await findTrips(
                    values
                );
                this.setState({ isSearching: false });
                this.setState({ isSearched: true });
                this.setState({ trips: trips.trips });
            } catch(error) {
                console.log(error);
                modalNotification("error", error.toString());
            }
             
        }
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onSelectedTrip = () => {
        this.setState({ isSelected: true });
    };

    onSelectTrip = async values => {
        //Cosas a chequear:
        //
        //
        const age = parseInt(values.age);
        if (!Number.isInteger( age )){
            modalNotification("error", "The age has be a number and positive.");
        }
        else{
            try {
                this.setState({ isSearching: true });
                await newPassenger({
                    ...values,
                    age,
                });
                modalNotification("success", "The new passenger has been charged.");
            } catch(error) {
                console.log(error);
                modalNotification("error", error.toString());
            }
             
        }
    }

    //Tal vez otra buena idea seria guardar las ciudades en el estado y actualizarlas en tiempo real
    onSelectedCity = () => {
        this.setState({ isSearched: false });
    };

    render() {
        const { cities } = this.props;
        const { isSearching, isSearched, trips, isSelected } = this.state;
        return(
            <div>
                <Spin spinning={isSearching}/>
                <Form
                    ref={this.findTripsFormRef}
                    onFinish={this.onFindTrip}
                    onFinishFailed={this.onFinishFailed}>
                        <Form.Item
                            label="Departure City"
                            name="departure_city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the departure city"
                                }
                            ]}>
                                <Select
                                    options={mapCitiesToSelectOptions(cities)}
                                    onChange={this.onSelectedCity}
                                />
                        </Form.Item>
                        <Form.Item
                            label="Arrival City"
                            name="arrival_city"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the arrival city"
                                }
                            ]}>
                                <Select
                                    options={mapCitiesToSelectOptions(cities)}
                                    onChange={this.onSelectedCity}
                                />
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit">
                                    Search
                            </Button>
                        </Form.Item>
                </Form>
                {!!isSearched && (
                    <Form
                        ref={this.selectTripFormRef}
                        onFinish={this.onSelectTrip}
                        onFinishFailed={this.onFinishFailed}>
                            <Form.Item
                                label="Select a trip"
                                name="tripId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a trip"
                                    }
                                ]}>
                                    <Select
                                        options={mapTripsToSelectOptions(trips)}
                                        onChange={this.onSelectedTrip}
                                    />
                            </Form.Item>
                            {!!isSelected && (
                                <>
                                    <p>Please input your dates</p>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input a name"
                                            }
                                        ]}>
                                            <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Age"
                                        name="age"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input a age"
                                            }
                                        ]}>
                                            <Input/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit">
                                                Submit
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                    </Form>
                )}
            </div>
        )
    }
}

export default FormPassenger;