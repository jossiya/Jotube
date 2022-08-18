import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Nav,Form,Button,Dropdown} from 'react-bootstrap'
import {AiOutlineSearch} from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import './side.css'
function SearchBar() {
    const params=useParams()
    const naviate=useNavigate()
    const [Videos, setVideos] = useState([])
    const [Value, setValue] = useState("")
    let [Search, setSearch] = useState([]);
    
    useEffect(() => {
        axios.post('/api/video/search')
        .then(response=>{
            if(response.data.success){
                console.log('검색 비디오 모든 정보',response.data.videos)
                setVideos(response.data.videos)
            }else{
                alert('비디오 검색 정보 받아오지 못했습니다.')
            }
        })
    }, [])
    const updateChange = (e) => {
        setValue(e.target.value)
        let data = e.target.value;
            
        let filterData = Videos.filter((i) =>
            i.title.replace(" ","").toLowerCase().includes(data.toLowerCase()) 
        );
        if (data.length === 0) {
            filterData = [];
        }
        setSearch(filterData);
        };
        const SearchPage=(e) => {
            // e.preventDefault()
            naviate(`/video/result`)
        }
        console.log()
        
    return (
        <>
        <Form style={{width : "100%"}} >
            <div className="search"  style={{position: "relative", display:"flex" ,justifyContent: "center"}}>
            <div className='search-button d-flex' >
                <input 
                className="search-bar"
                value={Value}
                type="text"
                name='search'
                style={{
                    width: "100%",
                    maxWidth:"70vh",
                    height: "40px",
                    border: "1px solid rgb(220,220,220)",
                }}
                placeholder="검색"
                onChange={(e) => updateChange(e)}
                />
                <button
                onClick={SearchPage}
                type='submit'
                style={{width:'65px' ,border:"1px solid rgb(220,220,220)"}}
                ><AiOutlineSearch size='25'/></button>
            </div>
            <div className='search_container' style={{width : '70%'}}>
            {Search.map((item,index) => {
                return( <div key={index} className="search-result" style={{}} >
                    <Nav.Link to={"/info/"} >
                    <div  onClick={() => {setSearch([])
                        setValue(item.title)}}>
                    {item.title}
                    </div>
                    </Nav.Link>
                </div>
            )})}       
            </div>
            
            </div>
        </Form>
        </>
    )
}

export default SearchBar