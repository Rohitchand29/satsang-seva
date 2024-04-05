import React from 'react'

function Location() {
  return (
    <div>
     function app() {
        const [latitude, setLatitude]= useState('')
        const [longitude, setLongitude]= useState('')
        React.useEffect(() => {
            navigator.geolocation.getCurrentPosition((position)=> 
            {
                console.log(position.coords)
            })
        })
     },[])
    </div>
  )
}

export default Location
