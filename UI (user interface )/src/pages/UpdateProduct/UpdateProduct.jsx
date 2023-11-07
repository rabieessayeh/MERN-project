import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import FileBase64 from 'react-file-base64';

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./newProduct.css";
import { ConstructionOutlined } from "@mui/icons-material";


export default function NewProduct(){

  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [prix, setPrix] = useState('');
  const [img, setImg] = useState('');
  const [article, setArticle] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios("http://localhost:5000/articles/find/" + id);
        setArticle(res.data);
      } catch {}
    };
    getArticle();
  }, [id]);


  const Modifier = (e) => {
      e.preventDefault();
     


      axios.put("http://localhost:5000/articles/"+id,{
        img,
        nom,
        prix,
        desc,
      }).then(()=>navigate("/product/"+id))
      .catch(err => alert(err.data.message))
    }


  return (
    <div className="Container">
      <Navbar  />
    <div className="newProduct">
      <h3 className="addProductTitle">Modifier {article.nom} </h3>
      <form className="addProductForm" encType="multipart/form-data" >
        
        <div className="addProductItem">
          <label>Image URL</label>
          
          <input
            name="img"
            type="text"
            value={img} onChange={(e) => setImg(e.target.value)} 
          />
        </div>

         <div className="addProductItem">
          <label>Nom</label>
          <input
            name="nom"
            type="text"
            value={nom} onChange={(e) => setNom(e.target.value)} 
          />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <textarea id="w3review" rows="4" cols="50"
            name="desc"
            type="text"
            value={desc} onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="addProductItem">
          <label>Prix</label>
          <input
            name="prix"
            type="number"
            value={prix} onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        
        <button className="addProductButton" onClick={Modifier}>
          Modifier
        </button>
       
       <Link to="/">
        <button className="addProductButton" type="reset">
          Annuler
        </button>

       </Link>
      </form>
    </div>
    <Footer />
    </div>
  );
}
