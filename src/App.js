import { Fragment, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import checkMark from './images/checkMark.png';
import wrongMark from './images/wrongMark.png';
import './App.css';
import ElementDatum from './components/ElementDatum.js';
import { Provider } from './Context.js'


function App() {
  
  let specialChars = `~!@#$%^&*()_+=-{}[]|\\'":;?/><.,`

  const [data, setData] = useState([{id: Math.floor(Math.random() * 1000), email: `admin@mail.com`, password: `1234567Aa`}]);
  const [isActive, setIsActive] = useState(true);
  const [isMinMax, setIsMinMax] = useState(false);
  const [numExist, setNumExist] = useState(false);
  const [upperExist, setUpperExist] = useState(false);
  const [lowerExist, setLowerExist] = useState(false);
  const [specialExist, setSpecialExist] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [viewData, setViewData] = useState([]);
  const [detectChange, setDetectChange] = useState(false);

  console.log(`email: ${email}`);
  console.log(`password: ${password}`);
  console.log(`MinMax: ${isMinMax}`);
  console.log(`numExist: ${numExist}`);
  console.log(`upperExist: ${upperExist}`);
  console.log(`lowerExist: ${lowerExist}`);
  console.log(`specialExist: ${specialExist}`);
  console.log(`isActive: ${isActive}`);
  console.log(`isNewUser: ${isNewUser}`);
  // console.log(`data: ${data[0].id}`);
  console.log(viewData)

  
  useEffect(() => {
    if(password.length > 6 && password.length < 20){
      setIsMinMax(true);
    } else{
      setIsMinMax(false);
    }

    if(checkNewUser()){
      setIsNewUser(true);
    } else{
      setIsNewUser(false);
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

    setViewData(data.map((datum, index) => {return (
      <Provider value={{
        data,
        setData,
        isActive,
        setIsActive,
        isMinMax,
        setIsMinMax,
        numExist,
        setNumExist,
        upperExist,
        setUpperExist,
        lowerExist,
        setLowerExist,
        specialExist,
        setSpecialExist,
        email,
        setEmail,
        password,
        setPassword,
        isNewUser,
        setIsNewUser,
        detectChange,
        setDetectChange
      }}>
        <ElementDatum key={datum.id} datum={datum} setData={setData} index={index} data={data} />
      </Provider>
      )} ))

    setDetectChange(false);
  }, [password, email, data, detectChange])

  useEffect(() => {
      if(
        isMinMax &&
        numExist &&
        upperExist &&
        lowerExist &&
        isNewUser &&
        !specialExist
      ){
        setIsActive(true);
      } else{
        setIsActive(false);
      }
  }, [isMinMax, specialExist, password, numExist, upperExist, isNewUser, lowerExist])


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
          setData(data => [...data, {id: Math.floor(Math.random() * 1000), email: email, password: password}]);
      } else{
        alert(`Email already exists`);
      }
  }


  return (
      <Fragment>
        <div className="row">
          <Form className="p-5 m-md-5 d-flex justify-content-center flex-column col-md-6 col-12">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address </Form.Label>
              <Form.Control
               type="email" 
               placeholder="Enter email"
               value={email}
               onChange={e => setEmail(e.target.value)}
               className="rounded-pill"
               />
              <Form.Text className="text-muted p-2 pl-4">
                {
                  (!isNewUser) ? 
                    <div>
                      <img src={wrongMark} /> Email is already in database
                    </div>
                    
                  :
                    <div>
                      <img src={checkMark} /> Email is available
                    </div>
                }
                {
                  (!isMinMax) ? 
                    <div>
                      <img src={wrongMark} /> Minimum characters is 6 with maximum of 20
                    </div>
                    
                  :
                    <div>
                      <img src={checkMark} /> Minimum characters is 6 with maximum of 20
                    </div>

                }
                
                {
                  (!numExist) ?
                    <div>
                      <img src={wrongMark} /> Password must have a number
                    </div>
                  :
                    <div>
                      <img src={checkMark} /> Password must have a number
                    </div>
                }
                
                {
                  (!upperExist) ?
                    <div>
                      <img src={wrongMark} /> Password must have an uppercase letter
                    </div>
                  :
                    <div>
                      <img src={checkMark} /> Password must have an uppercase letter
                    </div>
                }
                
                {
                  (!lowerExist) ?
                    <div>
                      <img src={wrongMark} /> Password must have a lowercase letter
                    </div>
                  :
                    <div>
                      <img src={checkMark} /> Password must have a lowercase letter
                    </div>
                }
            
                {
                  (specialExist) ?
                    <div>
                      <img src={wrongMark} /> Password must must not contain a special character
                    </div>
                  :
                    <div>
                      <img src={checkMark} /> Password must must not contain a special character
                    </div>
                }
                <div className="mt-3">
                  {
                    (
                      password.length < 10 && 
                      password.length !== 0 && 
                      isMinMax &&
                      numExist &&
                      upperExist &&
                      lowerExist &&
                      !specialExist
                    ) ?
                      <div>
                        Password strength: Good
                      </div>
                    :
                      (
                        isMinMax &&
                        numExist &&
                        upperExist &&
                        lowerExist &&
                        !specialExist
                      ) ?
                        <div>
                          Password strength: Excellent
                        </div>
                      :
                        <div>Password strength: Weak/Incomplete Criteria</div>
                  }
                </div>
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
                  <Button onClick={register} className="mt-4" variant="secondary" type="submit" disabled>
                    Submit
                  </Button>
            } 
          </Form>

          <div className="p-5 m-md-5 ">
            {viewData}
          </div>

        </div>
      </Fragment>
  );
}

export default App;
