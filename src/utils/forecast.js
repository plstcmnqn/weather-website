const request = require('postman-request');

const forecast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=dd29e1a747404fbf13d23aa0f937f1db&query='+ encodeURI(lat) + ',' + encodeURI(lon) +'&units=f';
    request({ url: url, json:true },(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
            console.log(body.error)
        }
        
        else{
        callback(undefined,{
            //name: response.body.location.localtime,
             message: ('The current temperature is ' + body.current.temperature +'. '+
            body.current.weather_descriptions[0] + '. ' +
            'Precip: '+ body.current.precip +'%.')
            //body: response.body
        })
    }
})
}

module.exports = forecast