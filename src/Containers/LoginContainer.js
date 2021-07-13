import React, { Component } from "react";

export default class LoginContainer extends Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            loginDisplay: true
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleLoginRegister = () => {
        this.setState({
            loginDisplay: !this.state.loginDisplay
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
        .then((r) => r.json())
        .then(user => {
          if (user.message){
            alert(user.message)
          }
          else{
            localStorage.token = user.jwt
            this.props.history.push('/')
            window.location.reload()
          }
        });
    }

    handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
        .then((r) => r.json())
        .then(user => {
          if (user.message){
            alert(user.message)
          }
          else{
            if (this.state.password === this.state.passwordConfirm) {
                localStorage.token = user.jwt
                this.props.history.push('/')
                window.location.reload()
            }
            else {
                alert("Password does not match. Please re-enter.")
            }
          }
        });
    }

    render() {
        return (
            <div className = {"loginContainer"}>
                <form className = {"authForm"} onSubmit = {!!this.state.loginDisplay
                    ? this.handleLogin
                    : this.handleRegister}>
                    <div className = {"authFormInnerDiv"}>
                        <input
                        onChange = {(e) => this.handleFormChange(e)}
                        className = {"authInput"}
                        placeholder = {"USERNAME"}
                        name = {"username"}
                        value = {this.state.username}>
                        </input>
                    <br/>
                        <input
                        onChange = {(e) => this.handleFormChange(e)}
                        className = {"authInput"}
                        placeholder = {"PASSWORD"}
                        type = {"password"}
                        name = {"password"}
                        value = {this.state.password}>
                        </input>
                    <br/>
                    {!!this.state.loginDisplay
                    ? null
                    : 
                        <div>
                        <input
                        onChange = {(e) => this.handleFormChange(e)}
                        className = {"authInput"}
                        placeholder = {"CONFIRM PASSWORD"}
                        type = {"password"}
                        name = {"passwordConfirm"}
                        value = {this.state.passwordConfirm}>
                        </input><br/>
                        </div>
                    }
                    <button className = {"login"}>{this.state.loginDisplay ? "LOGIN" : "REGISTER"}</button><br/>
                    <p className = {"registerToggle"} onClick={() => this.toggleLoginRegister()}>
                        {this.state.loginDisplay ? "NEW USERS CLICK HERE" : "CLICK HERE TO LOGIN"}
                    </p>
                    </div>
                </form>
            </div>
        )
    }
}