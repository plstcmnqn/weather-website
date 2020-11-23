

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImage = document.querySelector('#weather-photo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    //weatherImage.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
            messageOne.textContent = data.error
       }else{
        
           
        document.getElementById("myImg").src = data.forecast.wImage;
           // weatherImage.textContent = data.forecast.wImage;
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast.message
           
       }
    })
})
})

