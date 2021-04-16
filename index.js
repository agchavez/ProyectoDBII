const { seachProductor,addProductor, addMovie,addMovieProductor, seachGenres, addMovieGenres, addGenres, setDate} = require("./helpers/mssql");
const { moviePopular, movieDetails,companiesDetails, generateDeteils} = require("./helpers/query_api");
const sql = require('mssql');
var faker = require('faker');

var randomName = faker.name.findName(); 

const dbConfig = {
    user: '',
    password: '',
    server: 'server-azure-chavez.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: ' MovieTheater',
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true
        }
}

const fakert = ()=>{
    

    for (let i = 0; i < 10; i++) {
        
            var randomName = faker.date.past();
    }

}


const main = async()=> {

    let cumpleanos = new Date(1995,11,17,3,24,0);
    let pool = await sql.connect(dbConfig);
    const duration = await setDate(4, pool);

    // let lista = duration.split(':')
    // cumpleanos.setHours(cumpleanos.getHours() + lista[0]);
    // cumpleanos.setMinutes(cumpleanos.getMinutes() + lista[1]);
    // cumpleanos.setSeconds(cumpleanos.getSeconds() + lista[2]);

    console.log(duration);
    pool.close();
    // await generateDeteils().then((value)=>{
    //     value.genres.forEach(async (gen) => {
    //         await addGenres(gen.id, gen.name)
            
    //     });
    // });
    // for (let i = 550; i < 600; i++) {
    //    await moviePopular(i).then(
    //         (element)=>{
    //             console.log(element);
    //             element.forEach( async (movieP) => {
                    
    //                 //await Movie(movieP.id, pool);
                    
    //             });
                
    //         }
    //     )
    //     console.log("=======================");
    //     console.log(`pagina # ${i}`);
    //     console.log("=======================");     
    //     }
       
    
}

const Movie = async (id, pool)=>{
    
    await movieDetails(id).then(async (resp)=>{
        await addMovie(resp.id, resp.title, resp.homepage, resp.original_title, resp.original_language,resp.popularity,resp.release_date, resp.status, pool);
        await Productor(resp.production_companies, resp.id, pool);
        await Gener(resp.genres, resp.id, pool);
    })
}


const Productor = async (list, idmovie, pool)=> {
    await list.forEach(element =>{
        seachProductor(element.id, pool).then(
            async (value)=>{
                
                if(!value){
                    await companiesDetails(element.id).then(
                        async (comp)=>{
                            
                            await addProductor(comp.id, comp.name, comp.homepage, comp.origin_country, comp.headquarters, pool);
                            
                        }
                    )

                }
                await addMovieProductor(idmovie, element.id, pool);
                
            }
        )
    });

}

const Gener = async (list, idmovie, pool)=> {
    await list.forEach( async(element) =>{
        await addMovieGenres(idmovie, element.id,pool);
    });

}

main();
