import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUserList] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [condition,setCondition] =useState(false)
  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then((res) => res.json())
      .then((result) => {
        setUserList(result.data)
      })
  }, [])

  const handleUserDetails = (val) => {
    let id = val.id
    fetch('https://reqres.in/api/users/' + id)
      .then((res) => res.json())
      .then((result) => {
        setUserDetails(result.data)
        setCondition(true)
      })
  }

  return (
    <div className="App">
      <div>
        {
          condition ?
            (<>
              <div style={{ padding: '10px' }}>
                <div style={{border:'1px solid #a79e9e',padding:'10px',borderRadius:'3px'}}>
                <h3>Name : {userDetails.first_name + ' ' + userDetails.last_name}</h3>
                <h3>User Info</h3>
                <img src={userDetails.avatar}></img>
                <h4>Email : {userDetails.email}</h4>
                </div>            
              </div>
            </>) :
            (
              <>
                <div style={{ padding: '10px' }}>
                <h3>Please click on any button to get User Details</h3>
              </div>
              </>
            )
        }

        <div style={{ display: 'flex' }}>
          {
            user.map((d, i) => (
              <div style={{ padding: '5px' }} key={i}>
                <button onClick={() => handleUserDetails(d)}>user {i + 1}</button>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
