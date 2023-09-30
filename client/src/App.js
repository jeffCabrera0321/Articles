import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from './component/ArticleList';
import Form from './component/Form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function App() {

  const[articles, setArticles] = useState([]);
  const[editArticle, setEditArticle] = useState(null);
  
  const [token, setToken, removeToken] = useCookies(['myToken']);
  let navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token['myToken']}`}
  }
  useEffect(() =>{
    axios.get('http://127.0.0.1:8000/api/articles/', config).then(res => setArticles(res.data)).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (!token['myToken']){
        navigate('/');
    }
}, [token]);

  const editBtn = (article) => {
    setEditArticle(article);
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle;
      }
    });
    setArticles(new_article);
  }

  const articleForm = () =>{
    setEditArticle({title:'', description:''});
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myArticle => {
      if(myArticle.id === article.id){
        return false;
      }
      return true;
    });
     setArticles(new_articles);
  };
  const logoutBtn = () => {
    removeToken(['myToken']);
  }

  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h2>Articles</h2>
        </div>

        <div className='col'>
            <button className='btn btn-primary' onClick={articleForm}>Insert Article</button>
        </div>
        <div className='col'>
            <button className='btn btn-primary' onClick={logoutBtn}>Log out</button>
        </div>
      </div>
      <ArticleList articleList={articles} editBtn={editBtn} deleteBtn={deleteBtn}/>

      {editArticle ? <Form article={editArticle} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null}
      
    </div>
  );
}

export default App;
