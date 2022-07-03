import React from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBCardTitle, MDBCardGroup , MDBTooltip , MDBBtn} from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likexplore} from '../redux/features/xploreSlice';
import {updatefav} from '../redux/features/authSlice';
import Likes from './Likes';
import Styles from '../Styles/Card.module.css';
import fav from '../Images/fav.png'
import heart from '../Images/heart.png'
import sad from '../Images/sad.png';

const Card = ({imageUrl , likes, location, description , title, tags, creator, _id}) => {
    
    const {user, profile} = useSelector((state)=>({...state.auth}))
   
    const id = _id;
    let  value;
    if(profile){
        value = profile.favourites.includes(id);
    }
    
    const dispatch = useDispatch();

    const excerpt =(str)=>{
        if(str.length >90){
            str= str.substring(0,90)+" ...";
        }
        return str;
    }

    const handleClick = ()=>{
         dispatch(likexplore({id}))
    }





  return (
    <MDBCardGroup>
        <MDBCard className={`h-100 mt-2 d-sm-flex ${Styles.card}`}>
            <div className='bg-image hover-zoom hover-overlay'>
            <MDBCardImage src={imageUrl} alt={title} position="top" className={Styles.image}/>
            <div className={`mask ${Styles.box}`} style={{background: 'rgba(4,4,4,0.3)'}} onClick={()=>{dispatch(updatefav(id))}}>
                {profile ? (
                    <p>Click to {value? "remove from " : "add to "} your favourites<img src={value? sad : fav} alt='fav' className={Styles.emoji} style={value? {width:"30px", marginTop:"-0.5rem"} : {width:"32px"} }/></p>
                ):(
                    <p>Please login to fav!<img src={sad} alt='fav' className={Styles.emoji} style={{width:"30px", marginTop:"-0.5rem"}}/></p>
                )}
                
            </div>
            </div>
            <div className={Styles.creator}>Created By: {creator} { value ? ( <img src={heart} className={Styles.fav} alt='heart'/>): (null)}</div>
            <span className={`text-start tag-card ${Styles.tags}`}>
                <div>
                {tags.map((tag)=>(
                    <Link to={`/xplore/search/${tag}`} className={Styles.tag}> #{tag}</Link>    
                ))}
                </div>
                <MDBBtn onClick = {!user ? null: handleClick} className={Styles.btn} tag="a" color='none'>
                    { !user ? (
                          <MDBTooltip title="Please login to like" tag="a">
                              <Likes likes={likes}/>
                          </MDBTooltip>
                    ):(
                        <Likes likes={likes}/>
                    )

                    }
                  
                </MDBBtn>
            </span>
            <MDBCardBody>
                <MDBCardTitle className={`text-start ${Styles.title}`}>{title}</MDBCardTitle>
                <MDBCardText className={`text-start ${Styles.location}`}>{location}</MDBCardText>
                <MDBCardText className={`text-start ${Styles.desc}`}>{excerpt(description)}</MDBCardText>
                <Link to={`/xplore/${_id}` } className={Styles.link}>Read More</Link>
            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default Card