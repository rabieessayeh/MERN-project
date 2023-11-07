import styled from "styled-components";
import "../listCommande/CommandeList.css";
import {CheckCircle, Cached} from "@material-ui/icons";

import Navbar from "../../components/Navbar";
import {useNavigate} from "react-router-dom";


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
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;






const ButtonS = styled.button`
padding: 10px;
background-color: #dc3545;
cursor: pointer;
// font-weight: 500;
border: none;

`;

const ButtonV = styled.button`
padding: 10px;
background-color: #28a745;
cursor: pointer;
// font-weight: 500;
border: none;

`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Form = styled.div`
margin:10px;
display: flex;
justify-content: space-between;
`;






const CommandeList = () => {

  const [commandes, setCommandes] = useState();
  const [code, setCode] = useState();
  const [codeV, setCodeV] = useState();
  
  useEffect(() => {
    const getCommandes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/commandes");
        setCommandes(res.data);
      } catch (err) {}
    };
    getCommandes();
  });

  const Suprimer = (e) => {
    
    e.preventDefault();

   if(window.confirm("Voulez vous vraiment Supprimer ?")){
      axios.post("http://localhost:5000/commandes/delete",{
      _id:code

    }).then(alert("Commande supprimer"))

    .catch(err => alert("Commande non trouver"))
    }
  }

  const Valider = (e) => {
    
    e.preventDefault();

      axios.post("http://localhost:5000/commandes/update",{
      _id:codeV

    }).then(alert("Commande traitee"))

    .catch(err => alert("Commande non trouver"))

  }






  return (
    <Container>
      <Navbar />
      <Title><b>Liste des Commandes</b></Title>
     <Form>
     <form>
        <label >Coupier le code  de la commande a supprimer : </label> <br />
        <input type="text" placeholder="code" value={code} onChange={(e) => setCode(e.target.value)}/>
        <ButtonS onClick={Suprimer} > Supprimer</ButtonS>
      </form>

      <form>
        <label >Coupier le code  de la commande a valider : </label> <br />
        <input type="text" placeholder="code" value={codeV} onChange={(e) => setCodeV(e.target.value)}/>
        <ButtonV onClick={Valider} > Valider</ButtonV>
    </form>
     </Form>
      <Wrapper>
     

        <Hr />             
       
        <Bottom>

    <table class="table">
     <thead>
     	<tr>
        <th>Articles</th>          
        <th>Totale</th>
        <th>Adress de L'utilisateur</th>
        <th>Email de L'utilisateur</th>
        <th>Status</th>
        <th>Code</th>
     	</tr>
     </thead>
     <tbody>
     {commandes?.map((commande) =>(

                  
                <tr key={commande._id}>
                  
                  <td>
                    {
                       
                    commande.articles?.map((article) =>(
                      

                        <table>
                          <tr key={article[0]}>
                            <td> {article[0]["nom"]}</td>
                            <td> ({article[1]["quantite"]}) </td>
                          </tr>
                        </table>

                   )
                   )}
                    
                  </td>
              
                  <td data-label="Age"> {commande.totale} DH </td>
                  <td data-label="Marks%"> {commande.adress} </td>
                  <td data-label="Marks%"> {commande.email} </td>
                   <td>
                     {

                       commande.status ? <CheckCircle /> : <Cached />
                     }
                   </td>
                  <td data-label="Marks%"> {commande._id} </td>
                 

                </tr>

            )
            )}
     	  

     </tbody>
   </table>

        
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default CommandeList;
