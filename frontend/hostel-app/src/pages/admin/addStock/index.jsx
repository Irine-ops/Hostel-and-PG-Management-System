import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class AddStock extends Component{

    state = {
        name : '',
        quantity : 0,
        units : '',
    }

    onNameChange = event => {
        this.setState({
            name : event.target.value
        })
    }

    onQuantityChange = event => {
        this.setState({
            quantity : event.target.value
        })
    }

    onUnitChange = event => {
        this.setState({
            units : event.target.value
        })
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {name , quantity , units} = this.state
        try {
            const token = localStorage.getItem("jwt_token");

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    item_name : name,
                    quantity : quantity,
                    unit : units,
                })
            };

            const apiUrl = "http://localhost:5000/api/stocks/add-stock";

            const response = await fetch(apiUrl, options);
            const data = await response.json();

            if (response.ok) {
                alert("Stock Added Successfully!!!")
                this.setState({
                    name : '',
                    quantity : 0,
                    units : '',
                })
                console.log("Success:", data.message);
            } else {
                console.log("Error:", data.message);
            }

        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    render(){
        const {name , quantity , units} = this.state
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="room-details-container">
                    <h1 className="title">Add a Stock</h1>
                    <div className="complaint-form-container">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-label-and-input-item">
                                <label htmlFor="stock-name" className="form-label">Stock Name</label>
                                <input type="text" value={name} onChange={this.onNameChange} className="input-item" id="stock-name" placeHolder="Enter the name of the stock" />
                            </div>
                              <div className="form-label-and-input-item">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" value={quantity} onChange={this.onQuantityChange} className="input-item" id="quantity" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="units" className="form-label">Units</label>
                                <select value={units} className="input-item" onChange={this.onUnitChange}>
                                    <option value="">Select Option</option>
                                    <option value="kg">KG</option>
                                    <option value="liters">Liters</option>
                                    <option value="units">Units</option>
                                </select>
                            </div>
                            <div className="buttons-container">
                                <button className="button" type="submit">Add The Stock</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        )
    }

}

export default AddStock;

