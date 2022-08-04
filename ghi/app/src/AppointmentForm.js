import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: "",
            owner: "",
            date: "",
            time: "",
            technicians: [],
            reason: "",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        // console.log(data);
        
        let url = `http://localhost:8080/api/appointments/`;
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newAppt = await response.json();
            const cleared = {
                vin: "",
                owner: "",
                date: "",
                time: "",
                technicians: [],
                reason: "",
            }
            this.setState(cleared);
        }


    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value});
    }

    handleOwnerChange(event) {
        const value = event.target.value;
        this.setState({owner: value});
    }

    handleDateChange(event) {
        const value = event.target.value;
        this.setState({date: value});
    }

    handleTimeChange(event) {
        const value = event.target.value;
        this.setState({time: value});
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({reason: value})
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value})
    }


    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians});
        }
    }

    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Service Appointment</h1>
                <form onSubmit={this.handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleVinChange} placeholder="vin" required type="text" name="vin" value={this.state.vin} id="vin" className="form-control" />
                        <label htmlFor="vin">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleOwnerChange} placeholder="Name" required type="text" name="owner" value={this.state.owner} id="owner" className="form-control" />
                        <label htmlFor="owner">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleDateChange} placeholder="Date" required type="date" value={this.state.date} name="date" id="date" className="form-control" />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleTimeChange} placeholder="Time" required type="time" value={this.state.time} name="time" id="time" className="form-control" />
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleTechnicianChange} required id="technician" value={this.state.technician} name = "technician" className="form-select">
                        <option value="">Choose a Technician</option>
                        {this.state.technicians.map(technician => {
                            return (
                                <option key={technician.id} value={technician.id}>
                                {technician.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleReasonChange} placeholder="Reason" required type="text" name="reason" value={this.state.reason} id="reason" className="form-control" />
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default AppointmentForm