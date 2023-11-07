import { Badge } from "@material-ui/core";
import {ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Disconnect} from "../redux/userRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;




const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Connexion = styled.div`
display: flex;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;




const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Desconnect = () => {
    
      dispatch(Disconnect());
   
  }
  
  
  return (
    <Container>
      <Wrapper>
        <Left>
        
        <Link to="/"> <MenuItem>Home</MenuItem></Link>
          {
             user.isAdmin ?

             <Connexion>
                <Link to="/add"> 
                    <MenuItem>
                        Ajouter un article
                    </MenuItem> 
                  </Link>
                  
                  <Link to="/user-list"> 
                    <MenuItem>
                        Liste des utilisateurs
                    </MenuItem> 
                  </Link>

                  <Link to="/commandes"> 
                    <MenuItem>
                        Liste des commandes
                    </MenuItem> 
                  </Link>

                </Connexion>
                
                :
                


              ""

          }

          
        </Left>
        
        <Center>
          {
            user.isAdmin ? <Logo>ShopAdmin</Logo> : <Logo>Shop</Logo>
          }
        </Center>
       
        <Right>
        {
         user.isConnect ?  
         <Connexion>

                <Button onClick={Desconnect}>Déconnectée</Button>
                <MenuItem >{user.prenom.toUpperCase()}</MenuItem>
         </Connexion>
         
         :
      
          <Connexion>
            <Link to="/register">
            <MenuItem>Creer un compte</MenuItem>
          </Link>
          <Link to="/login" >
            <MenuItem>Se Connecter</MenuItem>
            </Link>
          </Connexion>

      }
       {
         user.isAdmin ? "" :
         <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
       }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
