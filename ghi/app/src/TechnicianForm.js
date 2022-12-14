import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            employeeNumber: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;

        let technicianrUrl = `http://localhost:8080/api/technicians/`;
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(technicianrUrl, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();
            const cleared = {
                name: "",
                employeeNumber: ""
            }
            this.setState(cleared);
        }


    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employeeNumber: value});
    }

    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Technician</h1>
                <form onSubmit={this.handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" value={this.state.name} id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEmployeeNumberChange} placeholder="Employee Number" required type="number" name="employeeNumber" value={this.state.employeeNumber} id="employeeNumber" className="form-control" />
                        <label htmlFor="employeeNumber">Employee Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default TechnicianForm