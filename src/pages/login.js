import React, {useState} from 'react'
import {Container, Row, Col} from 'react-grid-system';
import {Link} from 'react-router-dom';

import './login.css'

export default function Login() {
    const [formState, setFormState] = useState({
        username: null,
        password: null
    })

    const inputHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const submitHandler = () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(formState),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        fetch('http://127.0.0.1:3001/api/login', options)
          .then(response => response.json())
          .then(result =>  console.log(result))
          .catch(e => console.log(e))
    }

    return (
        <>
        <Container>
            <div className='login-form'> 
                <div className='wrapper'>
                    <h3>LOGIN</h3>
                </div>  
                <Row>
                    <Col>
                        <label>Username</label>
                        <input 
                            type='text'
                            id='username'
                            className='form-input'
                            onChange={inputHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Password</label>
                        <input 
                            type='text'
                            id='password'
                            className='form-input'
                            onChange={inputHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='login-btn-div'>
                            <button className='login-btn' onClick={submitHandler}>LOGIN</button>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <div className='register-btn-div'>
                            <Link to='/register' className='register-btn' >REGISTER</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        </>
    )
}
