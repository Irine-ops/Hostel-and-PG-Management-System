import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class StockManagement extends Component{

    state = {
        stock : [],
        editingId : '',
        quantityToUpdate : '',
    }

    componentDidMount(){
        this.loadStock()
    }

    loadStock = async() => {
        const apiUrl = "http://localhost:5000/api/stocks/all-stocks"
        const token = localStorage.getItem("jwt_token")

        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method : "GET"
        }

        const response = await fetch(apiUrl , options)
        const data = await response.json()

        if (response.ok){
            this.setState({
                stock : data,
            })
        }
    }

    onEditClick = (item) => {
        this.setState({ 
            editingId: item.id, 
            quantityToUpdate: item.quantity 
        })
    }

    onChangeQuantity = (event) => {
        this.setState({ quantityToUpdate: event.target.value })
    }

    deleteRoom = async(id) => {
        const token = localStorage.getItem("jwt_token")
        const options = {
        headers : {
            Authorization : `Bearer ${token}`,
        },
        method : "DELETE",
        }

        const apiUrl = `http://localhost:5000/api/stocks/delete-stock/${id}`
        const response = await fetch(apiUrl , options)
        const data = await response.json()

        if (response.ok){
            alert("Stock Deleted Successfully")
            this.loadStock()
        }
    }

    onUpdateStock = async() => {
        const {editingId , quantityToUpdate} = this.state
        const token = localStorage.getItem("jwt_token")
        const apiUrl = `http://localhost:5000/api/stocks/update-stock/${editingId}`

        const options = {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            method : "PUT",
            body : JSON.stringify({
                quantity : quantityToUpdate
            })
        }

        const response = await fetch(apiUrl , options)
        const data = await response.json()

        if (response.ok) {
            alert("Stock Updated Successfully")
            this.setState({ editingId: '' }) 
            this.loadStock() // Refresh list
        } else {
            alert("Failed to update stock")
        }
    }

    onAddStock = () => {
        window.location.href = "/admin/add-stock"
    }

    render(){
        const {stock , toUpdate , quantityToUpdate , editingId} = this.state;
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="stock-management-container">
                    <h1 className="title">Manage Stock</h1>
                    <table className="table-container">
                        <thead>
                            <tr className="t-ros">
                                <th className="table-rows">Stock Name</th>
                                <th className="table-rows">Quantity</th>
                                <th className="table-rows">Unit</th>
                                <th className="table-rows">Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {stock.map(each => (
                                <tr key={each.id}>
                                    <td className="table-row-item">{each.item_name}</td>
                                    <td className="table-row-item">
                                        {editingId === each.id ? (
                                            <input 
                                                type="number" 
                                                value={quantityToUpdate} 
                                                onChange={this.onChangeQuantity}
                                                className="input-item" 
                                            />
                                        ) : (
                                            each.quantity 
                                        )}
                                    </td>
                                    <td className="table-row-item">{each.unit}</td>
                                    <td className="table-row-item">
                                        <div className="margin-gap">
                                            {editingId === each.id ? (
                                                <button className="button" onClick={this.onUpdateStock}>Save</button>
                                            ) : (
                                                <button className="button" onClick={() => this.onEditClick(each)}>Edit</button>
                                            )}
                                            <button className="button" type="button" onClick={() => this.deleteRoom(each.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="login-button-container">
                        <button className="button" type="button" onClick={this.onAddStock}>Add a Stock</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default StockManagement;
