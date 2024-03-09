import { Component } from "react"
import { signUp } from '../../utilities/users-service'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default class SignUpForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',        
        password: '',
        confirm: '',
        error: ''
    }

handleChange = (evt) => {
    this.setState({
        [evt.target.name]: evt.target.value,
        error: ''
    })  
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
    <>
    <Typography component="h1" variant="h5" align="center" >Sign up</Typography>
    <Form onSubmit={this.handleSubmit}>
      <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.handleChange}
          required={true}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.handleChange}
          required={true}
        />        
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={this.state.email}
          onChange={this.handleChange}
          required={true}
        />      
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required={true}
        />
        <Input
          type="password"
          name="confirm"
          placeholder="Confirm password"
          value={this.state.confirm}
          onChange={this.handleChange}
          required={true}
        />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disable}
          >
            Sign Up
          </Button>
    </Form>    
    {this.state.error && <Typography variant="body1" align="center" color="#DF4625">{this.state.error}</Typography>}
    </>
  )
}
}
