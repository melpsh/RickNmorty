import React, { Children } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'



const Navbar = ({children}) => {
  return (
    <div className='navbar'>
        {/* <div className='navbar__logo'>LOGO</div> */}
        <Logo />
        {/* <input className='text-field' type='text' placeholder='search...' /> */}
        {/* <div className='navbar__result'>
            found {numOfCharacters} characters
        </div> */}
        {children}
        {/* <button className='heart'>
            <HeartIcon className='icon'/>
            <span className='badge'>4</span>
        </button> */}
    </div>
  )
}

export default Navbar

function Logo(){
    return <div className='navbar__logo'>LOGO</div>
}

export function Search({query, setQuery}){
    return <input className='text-field' type='text' placeholder='search...' value={query} 
    onChange={(event)=> setQuery(event.target.value)}/>
}

export function Result({numOfCharacters}){
    return(
         <div className='navbar__result'>
         found {numOfCharacters} characters
        </div>
    )
}


 export function Favorite({numOfFavorite}){
    return(
        <button className='heart'>
            <HeartIcon className='icon'/>
            <span className='badge'>{numOfFavorite}</span>
        </button>
    )
}