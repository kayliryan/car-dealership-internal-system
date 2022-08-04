import React from "react";

import { NavLink } from 'react-router-dom';


class VehicleModelList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {models: []}
        // this.deleteHat = this.deleteHat.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
        const data = await response.json();
        // console.log(data);
        this.setState({models: data.models});
        }
    }


    render() {
        return (
        <React.Fragment>
        <p className="h1 mt-3 mb-3">Vehicle Models</p>
        <div className="container-fluid">
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {this.state.models.map(model => {
                return (
                    <tr key={model.id}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name }</td>
                        <td><img src={ model.picture_url } style={{height:"100px", width:"200px"}}></img></td>
                    </tr>
                );
            })}  
            </tbody>
        </table>
        </React.Fragment>
        )
    }
}


export default VehicleModelList