import { Fragment, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './App.css';


function App() {
  
  let specialChars = `~!@#$%^&*()_+=-{}[]|\\'":;?/><.,`

  const [data, setData] = useState([{email: `admin@mail.com`, password: `1234567Aa`}]);
  const [isActive, setIsActive] = useState(false);
  const [isMinMax, setIsMinMax] = useState(false);
  const [numExist, setNumExist] = useState(false);
  const [upperExist, setUpperExist] = useState(false);
  const [lowerExist, setLowerExist] = useState(false);
  const [specialExist, setSpecialExist] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  console.log(`email: ${email}`);
  console.log(`password: ${password}`);
  console.log(`MinMax: ${isMinMax}`);
  console.log(`numExist: ${numExist}`);
  console.log(`upperExist: ${upperExist}`);
  console.log(`lowerExist: ${lowerExist}`);
  console.log(`specialExist: ${specialExist}`);
  console.log(`isActive: ${isActive}`);
  console.log(`isNewUser: ${isNewUser}`);
  console.log(`data: ${data}`);
  

  useEffect(() => {
    if(password.length > 6 && password.length < 20){
      setIsMinMax(true);
    } else{
      setIsMinMax(false);
    }

    if(checkNum()){
      setNumExist(true);
    } else{
      setNumExist(false);
    }

    if(checkUpper()){
      setUpperExist(true);
    } else{
      setUpperExist(false);
    }

    if(checkLower()){
      setLowerExist(true);
    } else{
      setLowerExist(false);
    }

    if(checkSpecialChar()){
      setSpecialExist(true);
    } else{
      setSpecialExist(false);
    }

    if(checkNewUser()){
      setIsNewUser(true);
    } else{
      setIsNewUser(false);
    }


  }, [password, email])

  useEffect(() => {
      if(
        isMinMax &&
        numExist &&
        upperExist &&
        lowerExist &&
        !specialExist
      ){
        setIsActive(true);
      } else{
        setIsActive(false);
      }
  }, [isMinMax,specialExist])


  function checkNum(){
      let result = false;

      for(let i = 0; i < password.length; ++i){
          if(isNaN(password[i])){
            continue;
          } else {
            result = true;
            break;
          }
      }

      return result;
  }



  function checkUpper(){
      let result = false;

      for(let i = 0; i < password.length; ++i){
          if(password[i].toUpperCase() === password[i] && isNaN(password[i])){
            result = true;
            break;
          }
      }

      return result;
  }



  function checkLower(){
      let result = false;

      for(let i = 0; i < password.length; ++i){
          if(password[i].toLowerCase() === password[i] && isNaN(password[i])){
            result = true;
            break;
          }
      }

      return result;
  }



  function checkSpecialChar(){
      let result = false;

      for(let i = 0; i < password.length; ++i){
        if(specialChars.includes(password[i])){
          result = true;
          break;
        }
      }

      return result;
  }


  function checkNewUser(){
    let result = true;
        for(let i = 0; i < data.length; ++i){
          if(data[i].email == email){
            result = false;
            break;
          }
        }
        return result;
  }

  function register(e){
      e.preventDefault();

      if(isNewUser){
          setData(data => [...data, {email: email, password: password}]);
      } else{
        alert(`Email already exists`);
      }
  }
   


  return (
      <Fragment>
        <Form className="p-5 m-5 d-flex justify-content-center flex-column col-6">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address </Form.Label>
            <Form.Control
             type="email" 
             placeholder="Enter email"
             value={email}
             onChange={e => setEmail(e.target.value)}
             className="rounded-pill"
             />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="rounded-pill"
            />
          </Form.Group>

          {
            (isActive) ?
                <Button onClick={register} className="mt-4" variant="primary" type="submit">
                  Submit
                </Button>
            :
                <Button onClick={register} className="mt-4" variant="primary" type="submit" >
                  Submit
                </Button>
          } 
        </Form>
      </Fragment>
  );
}

export default App;
