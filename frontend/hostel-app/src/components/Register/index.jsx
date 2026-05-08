import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class Register extends Component{

    state = {
        name : '',
        email : '',
        password : '',
        phoneNumber : '',
        confirmPassword : '',
        nameErrorMessage : '',
        phoneNumberMessage : '',
        passwordMessage : '',
        emailMessage : '',
        confirmMessage : '',
        errorMessage : '',
        showPassword : false,
        showConfirmPassword : false,
    }

    togglePassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    toggleConfirmPassword = () => {
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    }

    onNameChange = event => {
        const name = event.target.value;
        const onlyLetters = name.replace(/[^a-zA-Z\s]/g, "");

        let message = ""

        if (onlyLetters.length === 0){
            message = "Name is Required"
        }
        else if (onlyLetters.trim().length < 3) {
            message = "Name must be at least 3 characters";
        } 
        else {
            message = ""
        }
        
        this.setState({
            name : onlyLetters,
            nameErrorMessage: message,
        });
    }

    onPhoneNumberChange = event => {
        const phoneNumber = event.target.value.replace(/\D/g, '');
        const phoneRegex = /^(?!([0-9])\1{9})[6-9][0-9]{9}$/;

        let message = ""

        if (phoneNumber.length === 0) {
            message = "Phone number is required";
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

    onPasswordChange = event => {
        const password = event.target.value
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        let message = "";

        if (password.length === 0) {
            message = "Password is required";
        } else if (password.length < 8) {
            message = "Password must be at least 8 characters";
        } else if (!passwordRegex.test(password)) {
            message = "Must include uppercase, number, and symbol (@#$)";
        } else {
            message = "";
        }

        this.setState({
            password,
            passwordMessage: message,
        });
    }

    onConfirmPasswordChange = event => {
        const confirmPassword = event.target.value
        const { password } = this.state

        this.setState({
            confirmPassword,
            confirmMessage: confirmPassword === '' ? 'Confirm password required' : password !== confirmPassword ? 'Passwords do not match' : ''
        })
    }

    onEmailChange = event => {
        const email = event.target.value;
        const sanitizedValue = email.replace(/\s/g, '');
        
        const emailRegex = /^(?!.*\.\.)(?!.*\.$)[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
        const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

        let emailMessage = "";

        if (sanitizedValue.length === 0) {
            emailMessage = "Email Required";
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
    };


    onValidate = event => {
        event.preventDefault();
        const { 
            name, email, password, phoneNumber, confirmPassword, 
            nameErrorMessage, emailMessage, passwordMessage, phoneNumberMessage, confirmMessage 
        } = this.state;


        const isFormEmpty = !name || !email || !password || !phoneNumber || !confirmPassword;
        const hasErrors = nameErrorMessage || emailMessage || passwordMessage || phoneNumberMessage || confirmMessage;

        if (isFormEmpty) {
            this.setState({ errorMessage: "Please fill in all the fields" });
        } else if (hasErrors) {
            this.setState({ errorMessage: "Please fix the errors above" });
        } else {
            this.setState({ errorMessage: "" }, this.onSubmitRegister);
        }
    }


    onSubmitRegister = async() => {
        const {password , name , email , phoneNumber} = this.state;
        const userDetails = {password , name , email , phone_no : phoneNumber , address: ""}
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })
            const data = await response.json()
            if (response.ok) {
                window.location.href = "/"
            } else {
            console.log("ERROR RESPONSE:", data)   

            if (data.message === "Email already registered") {
                this.setState({
                    emailMessage: "Email is already registered"
                });
            } else {
                this.setState({
                    errorMessage: data.message,
                })
            }
        }
        }
        catch(error){
            this.setState({
                errorMessage : "Server Error"
            })
        }
    }
    render(){
        const {password , name , phoneNumber , email , confirmPassword , nameErrorMessage ,phoneNumberMessage , passwordMessage , confirmMessage , emailMessage , errorMessage , showPassword , showConfirmPassword} = this.state
        return(
            <div className="background-container">
                <div className="login-page-background-container">
                    <div className="login-form-container">
                        <form className="" onSubmit={this.onValidate}>
                            <h1 className="title">Hello There!</h1>
                            <div className="form-item-container">
                                <label htmlFor="name" className="label">Full Name</label>
                                <input type="text" value={name} onChange={this.onNameChange} placeholder="Enter your name" className="input" id="name" />
                                {nameErrorMessage && <p className="error-message">{nameErrorMessage}</p>}
                            </div>
                            <div className="form-item-container">
                                <label htmlFor="phoneNumber" className="label">Phone Number</label>
                                <input type="tel" inputMode="numeric" value={phoneNumber} onChange={this.onPhoneNumberChange} pattern="^(?!([0-9])\1{9})[6-9][0-9]{9}$" maxLength="10" className="input" id="phoneNumber" placeholder="Enter 10-digit phone number"/>
                                {phoneNumberMessage && <p className="error-message">{phoneNumberMessage}</p>}
                            </div>
                            <div className="form-item-container">
                                <label htmlFor="email" className="label">Email</label>
                                <input type="email" value={email} onChange={this.onEmailChange} placeholder="Enter your email" className="input" id="email" />
                                {emailMessage && <p className="error-message">{emailMessage}</p>}
                            </div>
                            <div className="form-item-container">
                                <label htmlFor="password" className="label">Password</label>
                                <div className="password-field">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={this.onPasswordChange} placeholder="8 or more characters" className="input" id="password"/>
                                    <button type="button" className="toggle-btn" onClick={this.togglePassword}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {passwordMessage && <p className="error-message">{passwordMessage}</p>}
                            </div>
                            <div className="form-item-container">
                                <label htmlFor="confirm-password" className="label">Confirm Password</label>
                                <div className="password-field">
                                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={this.onConfirmPasswordChange} placeholder="Give the same password" className="input" id="confirm-password"/>
                                    <button type="button" className="toggle-btn" onClick={this.toggleConfirmPassword}>
                                        {showConfirmPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {confirmMessage && <p className="error-message">{confirmMessage}</p>}
                            </div>
                            <div className="login-button-container">
                                <button className="login-button" type="submit">Register</button>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>
                        <p className="register-text">Already have an account? <Link to="/">Login Here</Link></p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register