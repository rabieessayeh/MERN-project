import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
 
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


function Register() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const postUser = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/auth/register",{
        nom,
        prenom,
        adress,
        email,
        password
      }).then(() => navigate("/login"))
      .catch(err => alert("Cette email exist deja"))
    }


  return (
    <Container>
      <Wrapper>
        <Title>Creer un compte</Title>
        <Form>
          <Input placeholder="nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
          <Input placeholder="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
          <Input placeholder="adress" value={adress} onChange={(e) => setAdress(e.target.value)}/>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="password" />
                  
         
                <Button onClick={postUser}> 
                      CREATE  
                </Button> 
          
          <br />
          <Link to="/login">
        
            <b>J'ai un compte</b><br/>
      
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
