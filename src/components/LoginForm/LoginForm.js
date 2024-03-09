import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        const user = await usersService.login(credentials);
        // Assuming you have a way to set the user at a higher level (context, redux, prop function)
        // setUser(user);
    } catch {
        setError('Log In Failed - Try Again');
    }
  };

  // Removed the `disable` variable and condition since it's not used in the current implementation.
  // Ensure you define a method to handle setting the user (commented out above) if you haven't already.

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={credentials.email}
          onChange={handleChange}
          required={true}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required={true}
        />
        <Input
          type="submit"
          value="Login"
        />
      </Form>
      {error && <p>{error}</p>}
    </>
  );
}