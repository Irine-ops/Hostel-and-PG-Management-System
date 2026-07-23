import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class ForgetPassword extends Component{

    state = {
        password : '',
        confirmPassword : '',
        errorMessage : '',
        email : '',
        otp : '',
        showPassword : false,
        showConfirmPassword : false,
        isOtpVerified : false,
    }

    onTogglePassword = () => {
        this.setState(prevState => ({
            showPassword : !prevState.showPassword
        }))
    }

    toggleConfirmPassword = () => {
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    }

    onEmailChange  = event => {
        const email = event.target.value;
        this.setState({
            email : email,
            errorMessage : '',
        })
    }

    onChangeOtp = event => {
        this.setState({
            otp : event.target.value,
        })
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value,
            errorMessage: ''
        })
    }

    onConfirmPasswordChange = event => {
        this.setState({
            confirmPassword: event.target.value,
            errorMessage: ''
        })
    }

    onValidate = (event) => {
        event.preventDefault()
        const {password , confirmPassword, email} = this.state
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!password || !confirmPassword || !email){
            this.setState({
                errorMessage : "Please fill all the fields"
            })
        }
        else if (password !== confirmPassword){
            this.setState({
                errorMessage : "Passwords do not Match"
            })
        }       
        else if (!passwordRegex.test(password)) {
            this.setState({
                errorMessage: "Please give a strong Password"
            })
        }
        else{
            this.onSubmit()
        }
    }

    onSubmit = async() => {
        const {password , confirmPassword , email} = this.state;
        const emailTrimmed = email.trim()
        const options = {
            headers : {
                "Content-Type" : "application/json",
            },
            method : "PUT",
            body : JSON.stringify({newPassword : password , confirmPassword : confirmPassword , email : emailTrimmed})
        }
        const apiUrl = "http://localhost:5000/api/passwords/reset-password"

       try {
            const response = await fetch(apiUrl, options)
            const data = await response.json()

            if (response.ok){
                window.location.href = "/"
            } else {
                this.setState({
                    errorMessage: data.message || "Something went wrong"
                })
            }
        } catch (error) {
            this.setState({
                errorMessage: "Server Error"
            })
        }
    }
    
    render(){
        const {password , confirmPassword ,otp ,errorMessage , email , showPassword , showConfirmPassword , isOtpVerified} = this.state
        return(
            <div>
                <div className="login-page-background-container">
                    <div className="login-form-container">
                        <form className="form" onSubmit={this.onValidate}>
                            <h1 className="title">Change Your Password!</h1>
                            <div className="form-item-container">
                                <label htmlFor="email" className="label">Enter Your Email</label>
                                <input type="email" value={email} onChange={this.onEmailChange} placeholder="Enter your email here" className="input" id="email" />
                            </div>
                            {isOtpVerified ? ( <div className="form-item-container">
                                <label htmlFor="password" className="label">Enter Your New Password</label>
                                <div className="password-field">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={this.onPasswordChange} placeholder="8 or more characters" className="input" id="password"/>
                                    <button type="button" className="toggle-btn" onClick={this.onTogglePassword}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>) : (
                                <div className="form-item-container">
                                    <label htmlFor="otp" className="label">Enter your OTP</label>
                                    <input type="text" className="input" value={otp} onChange={this.onChangeOtp} />
                                </div>
                            )}
                             {isOtpVerified && <div className="form-item-container">
                                <label htmlFor="confirm-password" className="label">Confirm Password</label>
                                <div className="password-field">
                                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={this.onConfirmPasswordChange} placeholder="Give the same password" className="input" id="confirm-password"/>
                                    <button type="button" className="toggle-btn" onClick={this.toggleConfirmPassword}>
                                        {showConfirmPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>}
                            <div className="login-button-container">
                                {isOtpVerified ? (<button className="login-button" type="submit">Set New Password</button>): (<button className="login-button">Get the Otp</button>)}
                            </div>
                            <p className="register-text">Have an Account ? <Link to="/">Login Here</Link></p>
                            <p className="register-text">Don't have an account ? <Link to="/register">Register Here</Link></p>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgetPassword