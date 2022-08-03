import React from 'react'

class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        appointments: [],
    }
    this.getAppointments = this.getAppointments.bind(this);
    }
    
    
    async getAppointments() {
    const apptUrl = 'http://localhost:8080/api/appointments/';
    try {
        const response = await fetch(apptUrl);
        if (response.ok) {
        const data = await response.json()
        console.log(data)
        this.setState({
            appointments: data.appointments,
        })
        };
    } catch (e) {
        console.error(e);
    }
    }

    async componentDidMount() {
        this.getAppointments();
    }

    async deleteAppointment(appt) {
        await fetch(`http://localhost:8080/api/appointments/${appt.id}/`, { method: 'DELETE' });
        let index = this.state.appointments.indexOf(appt);
        let updated_appts = [...this.state.appointments];
        updated_appts.splice(index,1)
        this.setState({appointments: updated_appts})
    }

    render () {
        return (
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
            </tr>
            </thead>
            <tbody>
                console.log(appointments)
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
                <td><button onClick={() => this.deleteAppointment(appt)}>Delete</button></td>
                </tr>
            )
            })}
            </tbody>
        </table>
        )
        }
    }

export default AppointmentList