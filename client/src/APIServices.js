import axios from 'axios';

export default class APIServices{


    static UpdateArticle(article_id, body, token){

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`},
        }
        const bodyObj = JSON.stringify(body)
        return axios.put(`http://127.0.0.1:8000/api/articles/${article_id}/`, bodyObj, config).then(res => res.data).catch(err => console.log(err));
    }

    static InsertArticle(body, token){
        console.log(token)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`},
        }
        const bodyObj = JSON.stringify(body)
        return axios.post(`http://127.0.0.1:8000/api/articles/`, bodyObj, config).then(res => res.data).catch(err => console.log(err)); 
    };

    static DeleteArticle(article_id, token){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`},
        }
        return axios.delete(`http://127.0.0.1:8000/api/articles/${article_id}/`, config).then(res => res.data).catch(err => console.log(err));
    };

    static LoginUser(body){
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const bodyObj = JSON.stringify(body)
        return axios.post(`http://127.0.0.1:8000/auth/`, bodyObj, config).then(res => res.data).catch(err => console.log(err)); 
    };

    static RegisterUser(body){
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const bodyObj = JSON.stringify(body)
        return axios.post(`http://127.0.0.1:8000/api/users/`, bodyObj, config).then(res => res.data).catch(err => console.log(err)); 
    };
}