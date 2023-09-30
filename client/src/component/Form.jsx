import React , { useState, useEffect } from 'react'
import APIServices from '../APIServices';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Form(props) {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');

    const [token] = useCookies(['myToken']);

    useEffect(() => {
    setTitle(props.article.title);
    setDescription(props.article.description);
    },[props.article]);

    const updateArticle = () => {
        APIServices.UpdateArticle(props.article.id, {title, description}, token['myToken']).then(res => props.updatedInformation(res)).catch(err => console.log(err));
    }
    const insertArticle = () => {
        APIServices.InsertArticle({title, description}, token['myToken']).then(res => props.insertedInformation(res)).catch(err => console.log(err));
    }

  return (
    <div>
        {props.article ?(
            <div className='mb-3'>
                <label htmlFor='title' className='form-label'>Title</label>
                <input type='text' className='form-control' id='title' placeholder='Please enter the title' value={title} onChange={e => setTitle(e.target.value)}></input>

                <label htmlFor='description' className='form-label'>Description</label>
                <textarea className='form-control' id='description' rows='5' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <br/>
                {
                    props.article.id ?  <button className='btn btn-success' onClick={updateArticle}>Update Article</button>:
                                        <button className='btn btn-success' onClick={insertArticle}>Insert Article</button>
                }
            </div>

        ): null}
    </div>
  )
}

export default Form