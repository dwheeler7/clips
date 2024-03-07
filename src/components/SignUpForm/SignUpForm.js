import { Component } from "react"
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        isClipper: false,
        password: '',
        confirm: '',
        error: ''
    }

handleChange = (evt) => {
    if (evt.target.type === 'checkbox') {        
        this.setState({
            [evt.target.name]: evt.target.checked,
            error: ''
        })
    } else {        
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }
}

handleSubmit = async (evt) => {
  evt.preventDefault()
  try {
    const formData = {...this.state}    
    delete formData.confirm
    delete formData.error
    const user = await signUp(formData)
    this.props.setUser(user)
  } catch {
    this.setState({ error: 'Sign Up Failed - Try Again' });
  }
}

render() {
  const disable = this.state.password !== this.state.confirm
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>First name</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
          <label>Last name</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
          <input type="checkbox" id="isClipper" name="isClipper" onChange={this.handleChange}/>
          <label htmlFor="isClipper">I plan to post plant clippings</label>
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
          
          <button type="submit" disabled={disable}>Sign up</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
  )
}
}