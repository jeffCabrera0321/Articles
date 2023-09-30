import React from 'react';
import APIServices from '../APIServices';
import { useCookies } from 'react-cookie';

function ArticleList(props) {

  const [token] = useCookies(['myToken']);

  const editBtn = (article) => {
    props.editBtn(article);
  }
  const deletBtn = (article) => {
    APIServices.DeleteArticle(article.id, token['myToken']).then(() => props.deleteBtn(article)).catch(err => console.log(err));
  }


  return (
    <div>
        {props.articleList?.map(article =>{
          return (
              <div key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>

                <div className='row'>
                  <div className='col-md-1'>
                    <button className='btn btn-primary' onClick={() => editBtn(article)}>Update</button>
                  </div>
                  <div className='col'>
                    <button className='btn btn-danger' onClick={() => deletBtn(article)}>Delete</button>
                  </div>
                </div>
                <hr className='hrclass'/>
            </div>
          );
        })}
    </div>
  )
}

export default ArticleList;