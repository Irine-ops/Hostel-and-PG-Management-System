import './index.css'
import AdminHeader from '../../../components/AdminHeader'
import {Component} from 'react'

class FeePayments extends Component{

    state = {
        feePayments : [],
    }

    componentDidMount(){
        this.loadPayments()
    }

    loadPayments = async () => {
        try {
            const token = localStorage.getItem("jwt_token")

            const response = await fetch("http://localhost:5000/api/payments/all-payments", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()
            console.log("DATA:", data)

            if (response.ok) {
                this.setState({
                    feePayments: Array.isArray(data) ? data : data.payments || []
                })
            } else {
                console.error("Error:", data)
            }

        } catch (error) {
            console.error("Network error:", error)
        }
    }


    
    render(){
        const {feePayments} = this.state
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="fee-payments-container">
                    <h1 className="title">Fee Payments</h1>
                    <table className="table-container">
                        <thead>
                            <tr className="t-ros">
                                <th className="table-rows">Name</th>
                                <th className="table-rows">Amount</th>
                                <th className="table-rows">Status</th>
                                <th className="table-rows">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feePayments.map(eachPayment => (
                                <tr key={eachPayment.payment_id}>
                                    <td className="table-row-item">{eachPayment.name}</td>
                                    <td className="table-row-item">{eachPayment.amount}</td>
                                    <td className="table-row-item">{eachPayment.payment_status}</td>
                                    <td>{new Date(eachPayment.payment_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}


export default FeePayments

