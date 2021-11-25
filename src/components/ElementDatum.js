import { useState, Fragment, useContext, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import checkMark from '../images/checkMark.png';
import wrongMark from '../images/wrongMark.png';
import Context from '../Context.js';

export default function ElementDatum(prop){
	console.log(prop.datum.email)

	let specialChars = `~!@#$%^&*()_+=-{}[]|\\'":;?/><.,`
	let tempArray = prop.data;

	const [isActive, setIsActive] = useState(true);
	const [isMinMax, setIsMinMax] = useState(false);
	const [numExist, setNumExist] = useState(false);
	const [upperExist, setUpperExist] = useState(false);
	const [lowerExist, setLowerExist] = useState(false);
	const [specialExist, setSpecialExist] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isNewUser, setIsNewUser] = useState(true);

	const {
		data,
		setData,
		setDetectChange
	} = useContext(Context);

	const [show, setShow] = useState(false);

 	const handleClose = () => setShow(false);
 	const handleShow = () => setShow(true);

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

 	}, [password, email, data])

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
 	        if(data[i].email == email ){
 	          result = false;
 	          break;
 	        }
 	      }
 	      return result;
 	}


 	// For refactoring
 	function update(e){
 	    e.preventDefault();

 	    tempArray[prop.index].email = email;
 	    tempArray[prop.index].password = password;

 	    if(isNewUser){
 	        setData(tempArray);
 	        setDetectChange(true);
 	    } else{
 	      alert(`Email already exists`);
 	    }
 	    handleClose();
 	    console.log(data);
 	}



	function removeThisElement(){
		prop.setData(prop.data.filter(datum => datum.email !== prop.datum.email));
	}
	
	return (
		<tr>
			<td className="text-center">
				{prop.datum.id}
			</td>
			<td>
				<div className="mr-auto pb-2 pl-2">{prop.datum.email}</div>
				
				<Button size="sm" className="ml-md-4" variant="warning" onClick={removeThisElement}>Remove</Button>

				<Button size="sm" className="ml-md-3" variant="primary" onClick={handleShow}>
				       Edit
				     </Button>

				     <Modal show={show} onHide={handleClose}>
				       <Modal.Header>
				         <Modal.Title>Modal heading</Modal.Title>
				       </Modal.Header>
				       <Modal.Body>
				       	<Form className="d-flex justify-content-center flex-column col-12">
				       	  <Form.Group controlId="formBasicEmail">
				       	    <Form.Label>Edit email</Form.Label>
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
				       	    <Form.Label>Edit Password</Form.Label>
				       	    <Form.Control 
				       	    type="password" 
				       	    placeholder="Password"
				       	    value={password}
				       	    onChange={e => setPassword(e.target.value)}
				       	    className="rounded-pill"
				       	    />
				       	  </Form.Group> 
				       	</Form>
				       </Modal.Body>
				       <Modal.Footer>
				         <Button variant="secondary" onClick={handleClose}>
				           Close
				         </Button>
				         {
				         	(isActive) ?
				         		<Button variant="primary" onClick={update}>
				         		  Update
				         		</Button>
				         	:
				         		<Button disabled variant="secondary" onClick={update}>
				         		  Update
				         		</Button>
				         }
				         
				       </Modal.Footer>
				     </Modal>
			</td>
		</tr>

	)
}