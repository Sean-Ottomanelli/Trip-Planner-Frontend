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
            <div>
                <form onSubmit = {!!this.state.loginDisplay
                    ? this.handleLogin
                    : this.handleRegister}>
                    <div>
                    <input
                    onChange = {(e) => this.handleFormChange(e)}
                    name = {"username"}
                    value = {this.state.username}>
                    </input>
                    <input
                    onChange = {(e) => this.handleFormChange(e)}
                    type = {"password"}
                    name = {"password"}
                    value = {this.state.password}>
                    </input>
                    {!!this.state.loginDisplay
                    ? null
                    : <input
                    onChange = {(e) => this.handleFormChange(e)}
                    type = {"password"}
                    name = {"passwordConfirm"}
                    value = {this.state.passwordConfirm}>
                    </input>}
                    </div>
                    <button>Login</button>
                </form>
                <p onClick={() => this.toggleLoginRegister()}>
                    {this.state.loginDisplay ? "Register" : "Login"}
                </p>
            </div>
        )
    }
}