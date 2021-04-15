const axios = require('axios').default;



const moviePopular = async(numberPage) =>{
    const paramsQ =  {
        'api_key':'bf2f2c7949e213535325476dc6355591',
        'language':'en-US',
        'page': `${numberPage}`
    }

    
    try {
        const instance = axios.create({
            baseURL: `https://api.themoviedb.org/3/movie/popular`,
            params: paramsQ
        });
        const resp = await instance.get();
        console.log(resp.data.results);
        return resp.data.results;
        
    } catch (error) {
        
    }
}

const movieDetails = async(id)=>{
    const paramsQ =  {
        'api_key':'bf2f2c7949e213535325476dc6355591',
        'language':'en-US'
    }
    try {
        const instance = axios.create({
            baseURL: ` https://api.themoviedb.org/3/movie/${id}`,
            params: paramsQ
        });
        const resp = await instance.get();
        return resp.data;
        
    } catch (error) {
        console.log("error")
        
    }
}
const companiesDetails = async(id)=>{
    const paramsQ =  {
        'api_key':'bf2f2c7949e213535325476dc6355591'
    }
    try {
        const instance = axios.create({
            baseURL: ` https://api.themoviedb.org/3/company/${id}`,
            params: paramsQ
        });
        const resp = await instance.get();
        return resp.data;
        
    } catch (error) {
        console.log(error)
        
    }
}

const generateDeteils = async (id) =>{
    const paramsQ =  {
        'api_key':'bf2f2c7949e213535325476dc6355591',
        'language': 'en-US'
    }
    try {
        const instance = axios.create({
            baseURL: ` https://api.themoviedb.org/3/genre/movie/list`,
            params: paramsQ
        });
        const resp = await instance.get();
        return resp.data;
        
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = {
    moviePopular,
    movieDetails,
    companiesDetails,
    generateDeteils

}