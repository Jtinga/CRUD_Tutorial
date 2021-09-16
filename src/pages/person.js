import {useState, useEffect, useMemo, useCallback} from 'react';
import {Container, Row, Col} from 'react-grid-system';

export default function Person() {
    const [data, setData] = useState();
    const [isUpdate, setUpdate] = useState(false);
    const [formState, setFormState] = useState({
        firstName: null,
        lastName: null,
        address: null
    });
  
    // GET METHOD
    const getHandler = () => {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        fetch('http://127.0.0.1:3001/api/get', options)
          .then(response => response.json())
          .then(result => result && result.error ? console.log(result.error) : setData(result) ) 
          .catch(e => console.log(e))
    }
  
    useEffect(() => {
      getHandler();
    }, [])
  
  
    /// DELETE HANDLER   -
    const deleteHandler = (e) => {
        const options = {
            method: 'DELETE',
            body: JSON.stringify(formState),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        fetch('http://127.0.0.1:3001/api/delete/' + e.target.id, options)
          .then(response => response.json())
          .then(result =>  result && result.success ? getHandler() : null)
          .catch(e => console.log(e))
    }
  
    // UPDATE HANDLER 
  
    const updateHandler = (e) => {
        setUpdate( true );
        let selected = data.filter( obj => obj._id === e.target.id)[0]
        setFormState(selected);
    }
  
    const submitUpdateHandler = () => {
      const options = {
          method: 'PUT',
          body: JSON.stringify(formState),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
      }
      fetch('http://127.0.0.1:3001/api/update/' + formState._id, options)
        .then(response => response.json())
        .then(result =>  result && result.success ? getHandler() : null)
        .catch(e => console.log(e))
    }
  
  
    const displayHandler = useMemo(() => {
      if(data){
            let arr = []
            data.map((x, index) => {
                arr.push(
                  <tr key={index}> 
                    <td>{x.firstName}</td>
                    <td>{x.lastName}</td>
                    <td>{x.address}</td>
                    <td>
                      <a 
                        className='table-btn'
                        id={x._id}
                        onClick={deleteHandler}
                      >Delete
                      </a>
                      <a 
                        className='table-btn'
                        id={x._id}
                        onClick={updateHandler}
                      >Update
                      </a>
                    </td>
                  </tr>
                )
            })
            return arr
      }
    })
  
    const inputHandler = (e) => {
        setFormState({
          ...formState,
          [e.target.id]: e.target.value
        })
    }
  
    const postHandler = () => {
      const options = {
          method: 'POST',
          body: JSON.stringify(formState),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
      }
      fetch('http://127.0.0.1:3001/api/post', options)
        .then(response => response.json())
        .then(result =>  result && result.success ? getHandler() : null)
        .catch(e => console.log(e))
    }
  
    const backHandler = () => {
      setUpdate(false);
      setFormState({
        firstName: null,
        lastName: null,
        address: null
      })
    }
  
    return (
        <Container>
        <div className="App">
          <div className='data-div'>
            <table className='table'>
            <tbody>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>ADDRESS</th>
                <th>OPTIONS</th>
              </tr>
                {displayHandler}
              </tbody>
            </table>
          </div>
          <div className='form-div'>
            <Row>
                <Col>
                    <label>First Name</label>
                    <input 
                        id='firstName'
                        className='first-name'
                        value={formState.firstName ? formState.firstName : '' }
                        onChange={inputHandler}
                    />
                </Col>
                <Col>
                   <label>Last Name</label>
                    <input 
                        id='lastName'
                        className='last-name'
                        value={formState.lastName ? formState.lastName : ''}
                        onChange={inputHandler}
  
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                  <label>Address</label>
                    <input 
                        id='address'
                        className='address'
                        value={formState.address ? formState.address : ''}
                        onChange={inputHandler}
                    />
                </Col>
            </Row>
  
          </div>
          <div className='button-div'>
              {isUpdate ? 
                <>
                <Row>
                    <Col>
                        <a
                          className='submit-btn'
                          onClick={submitUpdateHandler}
                        >UPDATE REQUEST
                        </a>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <a
                          className='back-btn'
                          onClick={ backHandler }
                        >Back to Post
                        </a>
                    </Col>
                </Row>
                </>
                  : 
                  <a
                    className='submit-btn'
                    onClick={postHandler}
                  >POST REQUEST
                  </a>
              }
          </div>
        </div>
      </Container>
    )
}
