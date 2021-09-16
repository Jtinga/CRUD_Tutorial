import React, {useState} from 'react'
import {Container, Row, Col} from 'react-grid-system';
import {Link} from 'react-router-dom';

import './register.css'

export default function Register() {
    const [isUserRegistration, setUserRegistration] = useState(false);

    const [formState, setFormState] = useState({
        username: null,
        password: null,
        confirm: null,
        email: null,
        isAdmin: null,
        isUser: null,
    })

    const inputHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value,
            isAdmin: !isUserRegistration,
            isUser: isUserRegistration,
        })
        console.log(formState)
    }

    const submitHandler = () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(formState),
            headers: {
              'Content-Type': 'application/json',
            },
        }
        fetch('http://127.0.0.1:3001/api/register', options)
          .then(response => response.json())
          .then(result =>  console.log(result))
          .catch(e => console.log(e))
    }

    const switchHandler = () => {
        setUserRegistration( prevMode => !prevMode);
    }

    return (
        <>
        <Container>
            <div className='login-form'> 
                <div className='wrapper'>
                    <h3>{isUserRegistration ? 'USER REGISTRATION' : 'ADMIN REGISTRATION'}</h3>
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
                    <Col>
                        <label>Confirm</label>
                        <input 
                            type='text'
                            id='confirm'
                            className='form-input'
                            onChange={inputHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Email Address</label>
                        <input 
                            type='text'
                            id='email'
                            className='form-input'
                            onChange={inputHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='login-btn-div'>
                            <button className='login-btn' onClick={submitHandler}>REGISTER</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='login-btn-div'>
                            <button className='login-btn' onClick={switchHandler}>SWITCH TO {isUserRegistration ? 'ADMIN REGISTRATION' : 'USER REGISTRATION'} </button>
                        </div>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <div className='register-btn-div'>
                            <Link to='/login' className='register-btn' >LOGIN</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        </>
    )
}
