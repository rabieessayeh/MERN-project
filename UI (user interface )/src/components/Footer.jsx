import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

import {Link as Links} from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;



const Footer = () => {
  const user = useSelector((state) => state.user);


  return (
    <Container>
      <Left>
        <Logo>Shop</Logo>
       
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
       
        </SocialContainer>
      </Left>
      <Center>
        <Title>Lien</Title>
        <List>
          <Links to="/"><ListItem>Home</ListItem></Links>
          {
            user.isAdmin ?
            <List>
              <Links to="/add"> 
                    <ListItem>
                        Ajouter un article
                    </ListItem> 
                  </Links>
                  
                  <Links to="/user-list"> 
                    <ListItem>
                        Liste des utilisateurs
                    </ListItem> 
                  </Links>

                  <Links to="/commandes"> 
                    <ListItem>
                        Liste des commandes
                    </ListItem> 
                  </Links>
            </List>

            :

            <Links to="/cart"><ListItem>Panier</ListItem></Links>
          }
          
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> B.P. 1796 Fès-Atlas,30003 MAROC
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> contact@shop.com
        </ContactItem>
        
      </Right>
    </Container>
  );
};

export default Footer;
