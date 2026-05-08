import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'


class UpdateProfile extends Component{

    state = {
        phoneNumber : '',
        phoneNumberMessage : '',
        email : '',
        errorMessage : '',
        isUpdated : false,
    }

    onPhoneNumberChange = event => {
        const phoneNumber = event.target.value.replace(/\D/g, '');
        const phoneRegex = /^(?!([0-9])\1{9})[6-9][0-9]{9}$/;

        let message = ""

        if (phoneNumber.length === 0) {
            message = "";
        } else if (!/^[6-9]/.test(phoneNumber)) {
            message = "Must start with 6, 7, 8, or 9";
        } else if (!phoneRegex.test(phoneNumber)) {
            message = "Invalid format (no repeating numbers)";
        }

        this.setState({
            phoneNumber : phoneNumber,
            phoneNumberMessage: message,
        });
    }

    onEmailChange = event => {
        const email = event.target.value;
        const sanitizedValue = email.replace(/\s/g, '');
        
        const emailRegex = /^(?!.*\.\.)(?!.*\.$)[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
        const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

        let emailMessage = "";

        if (sanitizedValue.length === 0) {
            emailMessage = "";
        } 
        else if (!emailRegex.test(sanitizedValue)) {
            emailMessage = "Invalid email format";
        } 
        else {
            const domain = sanitizedValue.split("@")[1];
            if (!allowedDomains.includes(domain)) {
                emailMessage = "Only Gmail, Yahoo, or Outlook allowed";
            } else {
                emailMessage = ""; 
            }
        }

        this.setState({ email: sanitizedValue, emailMessage: emailMessage });
    }

   onSubmitForm = async (event) => {
        event.preventDefault();
        const { phoneNumber, email, phoneNumberMessage, emailMessage } = this.state;

        if (!phoneNumber && !email) {
            this.setState({ errorMessage: "Please provide either a phone number or email to update." });
            return;
        }

        if (phoneNumberMessage || emailMessage) {
            this.setState({ errorMessage: "Please fix the validation errors first." });
            return;
        }

        const bodyData = {};
        if (email) bodyData.email = email;
        if (phoneNumber) bodyData.phoneNumber = phoneNumber;

        const token = localStorage.getItem("jwt_token");
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(bodyData),
        };

        const apiUrl = "http://localhost:5000/api/profile/update-user";

        try {
            const response = await fetch(apiUrl, options);
            let data = {};
            
            if (response.status !== 204) {
                data = await response.json().catch(() => ({}));
            }

            if (response.ok) {
                alert("Profile Updated Successfully!!!");
                this.setState({
                    phoneNumber: '',
                    email: '',
                    errorMessage: '',
                    phoneNumberMessage: '',
                    emailMessage: '',
                    isUpdated : true,
                });
            } else {
                this.setState({ errorMessage: data.message || "Update failed" });
            }
        } catch (error) {
            this.setState({ errorMessage: "Server is unreachable. Please try later." });
        }

    }


    render(){
        const {phoneNumber , email , errorMessage , phoneNumberMessage , emailMessage} = this.state
        return(
            <div className="update-profile-background-container">
                <Header />
                <div className="complaints-container">
                    <h1 className="title">Update Profile</h1>
                    <form className="form-container" onSubmit={this.onSubmitForm}>
                        <div className="form-label-and-input-item">
                            <label htmlFor="phone-number" className="form-label">Phone Number</label>
                            <input type="tel" inputMode="numeric" value={phoneNumber} onChange={this.onPhoneNumberChange} pattern="^(?!([0-9])\1{9})[6-9][0-9]{9}$" maxLength="10" className="input" id="phone-number"/>
                            {phoneNumberMessage && <p className="error-message">{phoneNumberMessage}</p>}
                        </div>
                        <div className="form-label-and-input-item">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" value={email} className="input" onChange={this.onEmailChange} id="email" />
                            {emailMessage && <p className="error-message">{emailMessage}</p>}
                        </div>
                        <div className="form-button-container">
                            <button className="button" type="submit">Submit</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {this.state.isUpdated && <p className="success-message">Profile updated successfully! ✅</p>}
                    </form>
                </div>
            </div>
        )
    }

}

export default UpdateProfile