import { Component } from "react"
import { addClipping } from '../../utilities/clippings-service'

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
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <label>Plant</label>
          <input type="text" name="plant" value={this.state.plant} onChange={this.handleChange} required />
          <label>Number of clippings</label>
          <input type="number" name="clippingsNum" min="0" max="50" value={this.state.clippingsNum} onChange={this.handleChange} required />
          <label>Description</label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} required />              
          <button type="submit">Add clipping</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{this.state.error}</p>
    </div>
  )
}
}
