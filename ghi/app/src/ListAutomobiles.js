import React from 'react'

class ListAutomobiles extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        automobiles: [],
      }
      this.getAutomobiles = this.getAutomobiles.bind(this);
    }
    
    
    async getAutomobiles() {
      const autoURL = 'http://localhost:8100/api/automobiles/';
      try {
        const autoResponse = await fetch(autoURL);
        if (autoResponse.ok) {
          const autoData = await autoResponse.json()
          this.setState({
            automobiles: autoData.autos,
          })
        };
      } catch (e) {
        console.error(e);
      }
    }
  
    async componentDidMount() {
      this.getAutomobiles();
    }
  
    render () {
      return (
        <React.Fragment>
        <p className="h1 mt-3 mb-3">Automobiles</p>
        <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>VIN</th>
            <th>Color </th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {this.state.automobiles.map(auto => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td> 
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </React.Fragment>
      )
    }
  }
  export default ListAutomobiles
  
  