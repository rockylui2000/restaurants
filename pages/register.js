/* /pages/register.js */

import React, { useState, useContext, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { registerUser } from '../components/auth';
import AppContext from '../components/context';

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '' });
  const [message, setMessage] = useState(''); //0413
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);

  function validate(field, label) {
    if (!field) {
      setMessage('Error: ' + label);
      setTimeout(() => setMessage(''), 10000);
      return false;
    }
    return true;
  }

  function handleValidation() {
    console.log(data.username, data.email, data.password);
    if (!validate(data.username, 'Username cannot be empty')) return;

    //valid email field: 1) not empty; 2) is email format; 3) not duplicate
    if (!validate(data.email, 'Email cannot be empty')) return;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      setMessage(`Error: You have entered an invalid email address`);
      setTimeout(() => setMessage(''), 10000);
      return;
    }
    if (!validate(data.password, 'Please enter a password')) return;
    if (data.password.length < 5) {
      setMessage(`Error: Length of the password must be eight or more`);
      setTimeout(() => setMessage(''), 10000);
      return;
    }

    registerUser(data.username, data.email, data.password)
      .then((res) => {
        // set authed user in global context object
        appContext.setUser(res.data.user);
        console.log(`registered user: ${JSON.stringify(res.data)}`);
        alert('Successful!');
        setLoading(false);
      })
      .catch((error) => {
        console.log(`error in register: ${error}`);
        alert('Register Failed!');
        //setError(error.response.data);
        setLoading(false);
      });
    setLoading(false);
  }

  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 5, offset: 3 }}>
          <div className='paper'>
            <div className='header'></div>
            <div className='message'>{message}</div>
            <section className='wrapper'>
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: 'red' }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type='text'
                      name='username'
                      //placeholder='input a username'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type='email'
                      //placeholder='Enter email'
                      name='email'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type='password'
                      //placeholder='Enter password'
                      name='password'
                      style={{ height: 50, fontSize: '1.2em' }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>
                      <a href='/login'>
                        <small>Already Customer?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: 'right', width: 120 }}
                      color='primary'
                      disabled={!data.username && !data.email && !data.password}
                      onClick={handleValidation}
                    >
                      {loading ? 'Loading..' : 'Submit'}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .message {
            font-family: verdana;
            font-size: 20px;
            color: red;
            text-align: center;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};
export default Register;
