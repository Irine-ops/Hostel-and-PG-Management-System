import './index.css'
import {Component} from 'react'
import {Link } from 'react-router-dom'

import logo from './logo-image.png';

class Login extends Component{

    state = {
        email : '',
        password : '',
        emailMessage : '',
        passwordMessage : '',
        errorMessage : '',
        showPassword : false,
    }

    onTogglePassword = () => {
        this.setState(prevState => ({
            showPassword : !prevState.showPassword
        }))
    }

    onEmailChange = event => {
        this.setState({
            email: event.target.value,
            emailMessage: '',
            errorMessage: '',
        })
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value,
            passwordMessage: '',
            errorMessage: '',
        })
    }

    onValidate = event => {
        event.preventDefault()

        const { email, password } = this.state
        const trimmedEmail = email.trim()

        let hasError = false
        let emailMessage = ''
        let passwordMessage = ''

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (trimmedEmail === '') {
            emailMessage = 'Email required'
            hasError = true
        } else if (!emailRegex.test(trimmedEmail)) {
            emailMessage = 'Invalid email format'
            hasError = true
        }

        if (password.trim() === '') {
            passwordMessage = 'Password required'
            hasError = true
        }

        this.setState({
            emailMessage,
            passwordMessage,
            errorMessage: ''
        })

        if (!hasError) {
            this.onSubmitForm()
        }
    }

    
    onSubmitForm = async() => {
        const {email, password} = this.state
        const userDetails = {email : email.trim() ,password}
        try {
            const options = {
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userDetails),
                method : "POST"
            }
            const response = await fetch("http://localhost:5000/api/auth/login" , options)
            const data = await response.json()

            if (response.ok){
                localStorage.setItem("jwt_token", data.token)
                localStorage.setItem("user_name" ,  data.user.name)
                localStorage.setItem("userId", data.user_id)

            if (data.user.role_id === 1) {
                window.location.href = "/admin"
            } 
            else if (data.user.role_id === 3){
                window.location.href = "/warden"
            }
            else {
                window.location.href = "/dashboard"
            }

            
            } else {
                this.setState({
                    errorMessage: data.message  || "Invalid Credentials "  // 👈 IMPORTANT
                })
            }
        }
        catch(error){
            this.setState({
                errorMessage : 'Server Error'
            })
        }
    }

    render(){
        const {email , password , emailMessage , passwordMessage , errorMessage , showPassword} = this.state
        return(
            <div>
                <div className="login-page-background-container">
                    <div className="login-form-container">
                        <form className="form" onSubmit={this.onValidate}>
                            <h1 className="title center-text">Welcome Back!</h1>
                            <div className="form-item-container">
                                <label htmlFor="email" className="label">Email</label>
                                <input type="email" value={email} onChange={this.onEmailChange} placeholder="Enter your email" className="input" id="email" />
                                {emailMessage && <p className="error-message">{emailMessage}</p>}
                            </div>
                            <div className="form-item-container">
                                <div className="label-container">
                                    <label htmlFor="password" className="label">Password</label>
                                    <Link to="/forget-password" className="register-text link">Forget Password ?</Link>
                                </div>
                                <div className="password-field">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={this.onPasswordChange} placeholder="8 or more characters" className="input" id="password"/>
                                    <button type="button" className="toggle-btn" onClick={this.onTogglePassword}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {passwordMessage && <p className="error-message">{passwordMessage}</p>}
                            </div>
                            <div className="login-button-container">
                                <button className="login-button" type="submit">Login</button>
                            </div>
                            <p className="register-text">Don't have an account? <Link to="/register">Register</Link></p>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        )
    }

}

export default Login