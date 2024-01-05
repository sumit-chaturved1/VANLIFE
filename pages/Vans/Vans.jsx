import React, { useState } from "react"
import { Link, useLoaderData, useSearchParams } from "react-router-dom"
import { getVans } from "../../api"

export function loader(){
    return getVans()
}

export default function Vans() {
    const vans = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const [error,setError] = useState(null)
    
    const typeFilter = searchParams.get('type')
    
    const displayedVans = typeFilter
        ? vans.filter(van => typeFilter === van.type)
        : vans
        
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id} state = {{"search" : `?${searchParams.toString()}`, "type" : typeFilter}} >
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    
    function handleFilterChange(key,value){
        setSearchParams(prevParam=>{
            if(value === null){
                prevParam.delete(key)
            }else{
                prevParam.set(key,value)
            }
            return prevParam
        })
    }
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="va" >
                <button 
                    className= { `van-type simple ${typeFilter === "simple" ? "selected": null }` }
                    onClick={() => {handleFilterChange("type","simple")}}
                    >Simple</button>

                <button 
                    className={ `van-type luxury ${typeFilter === "luxury" ? "selected": null }` } 
                    onClick={() => {handleFilterChange("type","luxury")}}
                    >Luxury</button>

                <button 
                    className={ `van-type rugged ${typeFilter === "rugged" ? "selected": null }` }
                    onClick={() => {handleFilterChange("type","rugged")}}
                    >Rugged</button>
                    
                {typeFilter? (    
                    <button 
                        className="van-type clear-filters" 
                        onClick={() => {handleFilterChange("type",null)}}
                        >Clear</button>
                    ) : null }
                    
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}