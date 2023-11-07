import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Navbar from "../components/Navbar";

import { mobile } from "../responsive";
import { useLocation, Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;



const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ButtonS = styled.button`
padding: 15px;
background-color: #dc3545;
cursor: pointer;
font-weight: 500;

`;

const ButtonM  = styled.button`
padding: 15px;
background-color: #ffc107;
margin-left: 20px;
cursor: pointer;
font-weight: 500;
`;

const Product = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios("http://localhost:5000/articles/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const Suprimer = (e) => {
    e.preventDefault();
    
    if(window.confirm("Voulez vous vraiment supprimer cette article ?")){
      axios.post("http://localhost:5000/articles/delete",{
      _id:id

    }).then(() => navigate("/"))

    .catch(err => alert(err.data.message))
    }
  }

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity})
    );
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.nom}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.prix} DH</Price>
          {
            user.isAdmin ? 
            
            <div>
                <Link to="/">
                  <ButtonS  onClick={Suprimer}>
                  Suprimer
                  </ButtonS>

                </Link>
           
                <Link to={`/update/${product._id}`} >
                  <ButtonM >
                    Modifier
                  </ButtonM>
                </Link>
            
            </div>

            
            :

            <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Ajouter au panier</Button>
          </AddContainer>
          }
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
