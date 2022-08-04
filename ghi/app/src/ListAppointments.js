import React from 'react'

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        appointments: [],
    }
    this.getAppointments = this.getAppointments.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.completeAppointment = this.completeAppointment.bind(this);
    }
    
    
    async getAppointments() {
        const apptUrl = 'http://localhost:8080/api/appointments/';
        try {
            const response = await fetch(apptUrl);
            if (response.ok) {
                const data = await response.json()
                let filteredData = {}
                let filteredArray = []
                let dataLength = (data.appointments).length
                for (let appointments in data) {
                    for(let i=0; i <dataLength; i+=1){
                        console.log(data[appointments])
                        if(data.appointments[i]["completed"]===false){
                            filteredArray.push(data.appointments[i])
                        }
                    }
                }
            filteredData["appointments"] = filteredArray
            this.setState({appointments: filteredData.appointments})
        };
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        this.getAppointments();
    }

    async deleteAppointment(appt) {
        await fetch(`http://localhost:8080/api/appointments/${appt.id}/`, { method: "DELETE" });
        let index = this.state.appointments.indexOf(appt);
        let updated_appts = [...this.state.appointments];
        updated_appts.splice(index,1)
        this.setState({appointments: updated_appts})
    }

    async completeAppointment(appt) {
        await fetch(`http://localhost:8080/api/appointments/${appt.id}/`, { method: "PUT" });
        let index = this.state.appointments.indexOf(appt);
        let updated_appts = [...this.state.appointments];
        updated_appts.splice(index,1)
        this.setState({appointments: updated_appts})
    }

    render () {
        return (
            <React.Fragment>
            <p className="h1 mt-3 mb-3">Service Appointments</p>
            <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
            <tr>
                <th>VIN</th>
                <th>Customer Name </th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>VIP</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {this.state.appointments.map(appt => {
            return (
                <tr key={appt.id}>
                <td>{appt.vin}</td>
                <td>{appt.owner}</td>
                <td>{appt.date}</td> 
                <td>{appt.time}</td>
                <td>{appt.technician}</td>
                <td>{appt.reason}</td>
                {appt.vip && <td>YES</td>}
                {!appt.vip && <td>NO</td>}
                <td><button className="btn btn-danger" onClick={() => this.deleteAppointment(appt)}>Cancel</button>
                <button className="btn btn-success" onClick={() => this.completeAppointment(appt)}>Finished</button>
                </td>
                </tr>
            )
            })}
            </tbody>
        </table>
        </React.Fragment>
        )
        }
    }

export default AppointmentList