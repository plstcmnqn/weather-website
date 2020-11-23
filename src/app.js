//core modules
const path = require('path');
//npm modules
const express = require('express');
const hbs = require('hbs')
//api calls
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000


//define paths of express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve

app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Justin Fonseca'
    })
})
app. get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Justin Fonseca'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
    title: 'Help',
    message: 'Sorry you are having trouble',
    email: 'help@help.com',
    name: 'Justin Fonseca'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address: req.query.address
        })
        })
    })

        // res.send({
        //     forecast:'success',
        //     location:'success',
        //     address: req.query.address

        // })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        message: 'The help article could not be found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404: not found',
        message: 'Looks like you took a wrong turn'
    })
})


app.listen(port,()=>{
    console.log('Server running on port '+ port)
})
// app.com
//app.com/help
//app.com/about
