import React from 'react'

class CreateSalesRecord extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            salepersons: [],
            customers: [],
            autos: [],
        }
        // this.handleName = this.handleName.bind(this);
        // this.handleNumber = this.handleNumber.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleName(event) {
    //     const value = event.target.value;
    //     this.setState({name:value});
    // }

    // handleNumber(event) {
    //     const value = event.target.value;
    //     this.setState({number: value});
    // }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const data = {...this.state};
    //     console.log(data)
    //     const custUrl =  `http://localhost:8090/api/salesperson/new/`;
    //     const fetchConfig = {
    //         method: "post",
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     };
    //     const response = await fetch(custUrl, fetchConfig);
    //     if (response.ok) {
    //         const cleared = {
    //             name: '',
    //             number: '',
    //         }
    //         this.setState(cleared)
    //     }

    // }
    async componentDidMount() {
        const autoUrl = 'http://localhost:8100/api/automobiles/'
        const autoresponse = await fetch (autoUrl)
        if (autoresponse.ok){
            const autodata = await autoresponse.json()
            this.setState({autos: autodata.autos})
        }
        const custUrl = 'http://localhost:8090/api/customers/'
        const custresponse = await fetch(custUrl)
        if (custresponse.ok){
            const custdata = await custresponse.json()
            this.setState({customers: custdata.customer})
        }
        const salepUrl = 'http://localhost:8090/api/salesperson/'
        const salepresponse = await fetch (salepUrl)
        if (salepresponse.ok) {
            const salepdata = await salepresponse.json()
            this.setState({salepersons: salepdata.saleperson})
        }
    }
    render() {
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Sales Record </h1>
                        <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
                            {/* Salesperson dropdown */}
                            <div className="mb-3">
                                <select required id="salesperson" name="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {this.state.salepersons.map(salespsn => {
                                    return(
                                        <option key={salespsn.id} value ={salespsn.id}>
                                            {salespsn.name}
                                        </option>
                                    )
                                })}
                                </select>
                            </div>
                            {/* automobile dropdown form */}
                            <div className="mb-3">
                                <select required id="automobile" name="automobile" className="form-select">
                                <option value="">Choose an Automobile</option>
                                {this.state.autos.map(car => {
                                    return(
                                        <option key={car.vin} value ={car.vin}>
                                            {car.model.name}
                                        </option>
                                    )
                                })}
                                </select>
                            </div>
                            {/* Customer Dropdown */}
                            <div className="mb-3">
                                <select required id="customer" name="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {this.state.customers.map(person => {
                                    return(
                                        <option key={person.id} value ={person.id}>
                                            {person.name}
                                        </option>
                                    )
                                })}
                                </select>
                            </div>
                            {/* Form component for adding in money */}
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
          </div>
        )
    }
}
export default CreateSalesRecord