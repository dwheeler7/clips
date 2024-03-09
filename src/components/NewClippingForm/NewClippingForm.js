import { Component } from "react"
import { addClipping } from '../../utilities/clippings-service'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'

export default class NewClippingForm extends Component {
    state = {
        plant: '',
        clippingsNum: 0, 
        description: '',
        error: '', // Make sure this is declared to handle errors
        redirect: false
    }

handleChange = (evt) => {
    const value = evt.target.name === 'clippingsNum' ? parseInt(evt.target.value, 10) : evt.target.value
    this.setState({
        [evt.target.name]: value,
        error: ''
    })
}

handleSubmit = async (evt) => {
  evt.preventDefault();
  try {
      const formData = {...this.state};
      delete formData.error; // Error and redirect should not be part of formData
      delete formData.redirect;
      const newClipping = await addClipping(formData); // Assume this returns the newly added clipping
      // Redirect using navigate function passed as a prop or using withRouter
      this.props.navigate('/'); // If using React Router v6 and navigate is passed as a prop
      // this.props.history.push('/'); // If using withRouter in React Router v5
  } catch (error) {
      this.setState({ error: 'Form Submission Failed - Try Again' });
  }
}

render() {
  return (
    <>
    <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="plant"
          placeholder="What type of plant?"
          value={this.state.plant}
          onChange={this.handleChange}
          required={true}
        />
         <Input
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          required={false}
        />
         <Input
          type="number"
          name="clippingsNum"
          placeholder="How many clippings?"
          value={this.state.clippingsNum}
          onChange={this.handleChange}
          required={true}
        />
        <Input
          type="submit"
          name="submit"          
          value="Post clippings"
        />
      </Form>
      
      </>
  )
}
}
