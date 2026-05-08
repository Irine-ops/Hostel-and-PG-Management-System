import './index.css'
import {Component} from 'react'
import QRCode from 'react-qr-code'
import Header from '../../../components/Header'

class FeePayment extends Component{

    state = {
        payments : [],
        message : '',
        selectedMethod : '',
    }

    componentDidMount(){
        this.loadPayment()
    }

    loadPayment = async() => {
        const token = localStorage.getItem("jwt_token")
        const apiUrl = "http://localhost:5000/api/payments/my-payment"
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            }, 
            method : "POST",
        }
        const response = await fetch(apiUrl , options)
        const data = await response.json()

       this.setState({
            payments: data.payments || [],
            message: data.message || ""
        })
    }   


    handlePayment = async (event) => {
        event.preventDefault();
        const {selectedMethod} = this.state
        const apiUrl = "http://localhost:5000/api/payments/make-payment";
        const token = localStorage.getItem("jwt_token");

        // Fix: Safely get the amount
        if (this.state.payments.length === 0) {
            this.setState({ message: "No billing information found." });
            return;
        }
        const amount = this.state.payments[0].amount;

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ amount : amount , payment_method : selectedMethod })
        };

        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json().catch(() => ({})); 

            if (response.ok) {
                alert("Payment Successful!");
                this.setState({ message: data.message });
                this.loadPayment(); 
            } else {
                this.setState({ message: data.message || "Payment failed" });
            }
        } catch (error) {
            this.setState({ message: "Server error. Please try again." });
        }
    }


    render(){
        const {message , payments , selectedMethod} = this.state
        const amount = payments.length > 0 ? payments[0].amount : "0"
        return(
            <div className="payment-background-container">
                <Header />
                <div className="fee-payment-container">
                    <h1 className="title">Fee Payment</h1>
                    <div className="payment-card">
                        <h2 className="title">Monthly Rent</h2>
                        <p className="amount">₹{amount}</p>
                    </div>

                    <div className="buttons-container">
                        <button onClick={() => this.setState({ selectedMethod: 'qr' })} className="pay-btn" disabled={message.includes("already")}>
                            Pay by QR
                        </button>
                        <button className="pay-btn" onClick={() => this.setState({ selectedMethod: 'cash' })}>
                            Pay By Cash
                        </button>
                    </div>

                    {selectedMethod === 'qr' && amount !== 0 && (
                        <div className="cash-container">
                            <QRCode value={`upi://pay?pa=YOUR_UPI_ID@okicici&pn=Hostel&am=${amount}`} size={150} />
                            <p className="title">Scan to Pay ₹{amount}</p>
                            <button onClick={this.handlePayment} className="pay-btn">I have Paid</button>
                        </div>
                    )}

                    {selectedMethod === 'cash' && amount !== 0 && (
                        <div className="cash-container">
                            <p className="title">Visit the warden's office to pay ₹{amount} in cash.</p>
                            <button onClick={this.handlePayment} className="pay-btn">Confirm Cash Intent</button>
                        </div>
                    )}

                    <p className="message">{message}</p>
                </div>

                {/* 📜 Payment History */}
                <h2 className="history-title">Payment History</h2>

                <div className="history-container">
                    {payments.filter(p => p.payment_status === "completed").map(p => (
                        <div key={p.payment_id} className="history-card">
                            <p><strong>Amount:</strong> ₹{p.amount}</p>
                            <p>
                                <strong>Status:</strong>
                                <span className={p.payment_status === "completed" ? "paid" : "pending"}>
                                    {p.payment_status}
                                </span>
                            </p>
                            <p><strong>Txn:</strong> {p.payment_id}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default FeePayment;

