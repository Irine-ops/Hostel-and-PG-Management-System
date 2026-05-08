import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader';

class StockHelp extends Component{

    state = {
        stockProvider : '',
        itemRequired : '',
        quantity : '',
    }

    onStockChange = event => {
        this.setState({
            stockProvider : event.target.value
        })
    }

    onItemChange = event =>{
        this.setState({
            itemRequired : event.target.value
        })
    }

    onQuantityChange = event => {
        this.setState({
            quantity : event.target.value
        })
    }

    onSubmitForm = async(event) => {
        event.preventDefault()
        try {
            const apiUrl = "http://localhost:5000/api/stocks/stock-help"
            const token = localStorage.getItem("jwt_token")
            const {stockProvider , itemRequired , quantity} = this.state

            const stockHelp = {stockProvider , itemRequired , quantity}

            const options = {
                headers : {
                    Authorization : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                method : "POST",
                body : JSON.stringify(stockHelp)
            }

            const response = await fetch(apiUrl , options);
            const data = await response.json()

            if (response.ok){
                alert("Help Submitted Sucessfully!")
                this.setState({
                    stockProvider : '',
                    itemRequired : '',
                    quantity : '',
                })
            }
            else{
                alert("Help not Submitted")
            }
        } catch (error){
            console.error("Network error:", error)
        }
    }


    render(){
        const {stockProvider , itemRequired , quantity} = this.state
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="room-details-container">
                    <h1 className="title">Stock Help</h1>
                    <div className="complaint-form-container">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-label-and-input-item">
                                <label htmlFor="stock-name" className="form-label">Stock Provider</label>
                                <select value={stockProvider} className="input-item" onChange={this.onStockChange}>
                                    <option value="">Select Option</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Fruits and Vegetables Shop">Fruits and Vegetables Shop</option>
                                    <option value="Electricals">Electricals</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="quantity" className="form-label">Item Required</label>
                                <textarea type="text" value={itemRequired} onChange={this.onItemChange} className="input-item" id="quantity" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" value={quantity} onChange={this.onQuantityChange} className="input-item" id="quantity" />
                            </div>
                            <div className="buttons-container">
                                <button className="button" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default StockHelp;