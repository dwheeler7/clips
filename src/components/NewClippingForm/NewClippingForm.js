import { Component } from "react"
import { addClipping } from '../../utilities/clippings-service'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'

export default class NewClippingForm extends Component {
    state = {
        plant: '',
        clippingsNum: 0, 
        description: ''
    }

handleChange = (evt) => {
    const value = evt.target.name === 'clippingsNum' ? parseInt(evt.target.value, 10) : evt.target.value
    this.setState({
        [evt.target.name]: value,
        error: ''
    })
}

handleSubmit = async (evt) => {
  evt.preventDefault()
  try {
    const formData = {...this.state}
    formData.clippingsNum = parseInt(formData.clippingsNum, 10)    
    delete formData.error
    await addClipping(formData)
  } catch {
    this.setState({ error: 'Form Submission Failed - Try Again' })
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
