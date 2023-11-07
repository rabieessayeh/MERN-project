import styled from "styled-components";
import "../userList/userList.css";


import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom";


 import { mobile } from "../../responsive";
import { useState, useEffect } from "react";


import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding-top: 30px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  color:#5e7dce;
`;




const Bottom = styled.div`
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;





const ButtonS = styled.button`
padding: 5px;
background-color: #dc3545;
cursor: pointer;
border: none;

`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;






const UserList = () => {

  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {}
    };
    getUsers();
  });

  const Suprimer = (e) => {
    
    e.preventDefault();

   if(window.confirm("Voulez vous vraiment le supprimer ?")){
      axios.post("http://localhost:5000/users//delete",{
      email

    }).then(() => navigate("/user-list"))

    .catch(err => alert("Utilisateur non supprimer"))
    }
  }






  return (
    <Container>
      <Navbar />
      <Title><b>Liste des utilisateurs</b></Title>
      <form>
        <label >Entrer l'email de l'utilisateur a supprimer : </label> <br />
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <ButtonS onClick={Suprimer}> Supprimer</ButtonS>
    </form>
      <Wrapper>
     

        <Hr />             
       
        <Bottom>

    <table className="table">
     <thead>
     	<tr>
        <th>Nom</th>          
        <th>Prenom</th>
        <th>Email</th>
        <th>Adress de L'utilisateur</th>
     	</tr>
     </thead>
     <tbody>

        {users?.map((user) =>(
                    
        <tr key={user._id}>

          
          
        <td >{user.nom}</td>
        <td >{user.prenom}</td>
        <td >{user.email}</td>
        <td >{user.adress}</td> 
        </tr>
        

        ))}

     </tbody>    
   </table>      
              
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default UserList;
