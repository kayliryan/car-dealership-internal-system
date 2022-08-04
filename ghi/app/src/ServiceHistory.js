import React from 'react'

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        vin: "",
        appointments: [],
    }
    this.getHistory = this.getHistory.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.sendWarning = this.sendWarning.bind(this);
    }
    
    
        handleVinChange(event) {
            const value = event.target.value;
            this.setState({vin: value});
        }
    
    async getHistory() {
        if (this.state.vin === "") {
            this.setState({
                appointments: [],
            })
        }
        else {
            const apptUrl = `http://localhost:8080/api/appointments/${this.state.vin}`;
            try {
                const response = await fetch(apptUrl);
                if (response.ok) {
                    let errorTag = document.getElementById('error-message')
                    errorTag.classList.add('d-none');
                    let data = await response.json()
                    let filteredData = {}
                    let filteredArray = []
                    let dataLength = (data.appointments).length
                    for (let appointments in data) {
                        for(let i=0; i <dataLength; i+=1){
                            if(data.appointments[i]["completed"]===true){
                                filteredArray.push(data.appointments[i])
                            }
                        }
                    }
                filteredData["appointments"] = filteredArray
                this.setState({appointments: filteredData.appointments})
                }
                else {
                    this.sendWarning()
                }
            } catch (e) {
                console.error(e);   
            }
            }
    }

    async componentDidMount() {
        this.getHistory();
    }

    async sendWarning() {
        let errorTag = document.getElementById('error-message')
        errorTag.classList.remove('d-none');
    }




    render () {
        return (
            <React.Fragment>
            <div className="input-group mt-3 mb-3">
                <input onChange = {this.handleVinChange} type="search" value = {this.state.vin} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button onClick = {this.getHistory} type="button" className="btn btn-outline-primary">VIN</button>
            </div>
            <div className="alert alert-danger d-none" id="error-message" role="alert">
                This VIN does not exist
            </div>
            <p className="h1">Service History</p>
            <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
            <tr>
                <th>VIN</th>
                <th>Customer Name </th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
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
                </tr>
            )
            })}
            </tbody>
        </table>
        </React.Fragment>
        )
        }
    }

export default ServiceHistory