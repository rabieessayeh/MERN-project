import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState} from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./newProduct.css";


export default function NewProduct(){

  const [nom, setNom] = useState('');
  const [desc, setDesc] = useState('');
  const [prix, setPrix] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();


  const Ajouter = (e) => {
      e.preventDefault();
      axios.post("http://localhost:5000/articles",{
        nom,
        prix,
        desc,
        img,
      }).then(() => navigate("/"))
      .catch(err => alert("Erreur"))
    }


  return (
    
    <div className="Container">
      <Navbar  />
    <div className="newProduct">
      <h3 className="addProductTitle">Ajouter un article</h3>
      <form className="addProductForm" encType="multipart/form-data">
        <div className="addProductItem">
          <label>Image URL</label>
          
          
          <input
            type="text"
            id="file"
            name="img"
            value={img} onChange={(e) => setImg(e.target.value)}
          />


        {/* <FileBase64
        multiple={ false }
        onDone={ ({base64}) => setImg(base64)} /> */}


        </div>
        <div className="addProductItem">
          <label>Nom d'article</label>
          <input
            name="nom"
            type="text"
            placeholder="HP DELL"
            value={nom} onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea id="w3review" rows="4" cols="50"
            name="desc"
            type="text"
            placeholder="description..."
            value={desc} onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Prix</label>
          <input
            name="prix"
            type="number"
            placeholder="100"
            value={prix} onChange={(e) => setPrix(e.target.value)}
          />
        </div>

        <Link to="/">
          <button className="addProductButton" onClick={Ajouter}>
            Ajouter
          </button>
        </Link>
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
