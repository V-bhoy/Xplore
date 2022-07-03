import { MDBContainer,MDBCard, MDBCardBody, MDBCardImage, MDBCardSubTitle, MDBCardTitle, MDBCardText, MDBValidation, MDBInput , MDBBtn, MDBRow} from 'mdb-react-ui-kit';
import React,{useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux';
import girl from '../Images/girl.jpg'
import Styles from '../Styles/Profile.module.css'
import emoji from '../Images/profile.png'
import {useNavigate} from 'react-router-dom';
import sad from '../Images/sad.png'
import heartEye from '../Images/heart-eye.png'
import {Link} from 'react-router-dom';
import { getfav } from '../redux/features/authSlice';
import Card from '../Components/Card';


const Profile = () => {
    const { profile , favs} = useSelector((state)=>({...state.auth}));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(favs);
    useEffect(()=>{
          dispatch(getfav());
    },[profile])
    

  return (
    <>
      <div className={Styles.edit}>
          <MDBBtn onClick={()=>navigate('/profile/edit')}>Edit Profile</MDBBtn>
      </div>
    <MDBContainer className={Styles.main}>
        <MDBCard style={{marginTop:"200px", backgroundColor:'rgb(230,230,250)', marginBottom:"30px"}} className={`${Styles.wrapper} d-flex flex-md-row justify-content-md-around`}>
           
            <div>
                <MDBCardImage src={profile?.profileUrl ? profile?.profileUrl : girl} alt="profile-url" className={Styles.profile}/>
            </div>
           <div>
           <MDBCardBody className='d-flex flex-column align-items-lg-start'>
                <MDBCardTitle className='mb-4' style={{color:"rgb(81, 65, 79)", fontWeight: "800"}}><img src={emoji} alt='emoji' className={Styles.emoji}/><span className={Styles.heads}>Name &nbsp;-  &nbsp;</span> {profile?.name}</MDBCardTitle>
                <MDBCardSubTitle className='mb-4' style={{color:"rgb(81, 65, 79)", fontWeight: "800"}}><img src={emoji} alt='emoji' className={Styles.emoji}/><span className={Styles.heads}>Username &nbsp; -    &nbsp;    </span> {profile?.username}</MDBCardSubTitle>
                {
                   profile?.bio ? (
                   <>
                     { profile?.website ? (<MDBCardText style={{color:"rgb(81, 65, 79)", fontWeight: "800"}}><img src={emoji} alt='emoji' className={Styles.emoji}/><span className={Styles.heads}>Website &nbsp; -     &nbsp;   </span><Link to={profile?.website}>Click to visit</Link></MDBCardText>) : (null) }
                     <MDBCardText style={{color:"rgb(81, 65, 79)", fontWeight: "800"}}>{profile?.bio}</MDBCardText>
                   </> 
                  ):(
                     <div className={`d-flex justify-content-center align-items-center p-2 ${Styles.editBox}`}>
                      <div className='d-flex flex-column align-items-start' style={{lineHeight:"0.5"}}>
                          <p>Please edit your profile!   <img src={sad} alt="" className={Styles.emojiSad}/></p>
                          <p>You can find the button on top-right corner...</p>
                      </div>
                      
                     </div>  
                  )
                }
            </MDBCardBody>
            

           </div>
       </MDBCard> 
       <hr/>
       <div className='mt-3'>
          <h3 className='mb-4 pt-3' style={{fontWeight:"bold"}}>Your Favourites
            <img style={{width: "48px", marginTop:"-0.8rem", marginLeft:"0.8rem"}} src={heartEye} alt="heart-eye"/>
          </h3>
       </div>
       <MDBRow className='row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3'>
           {favs.map((elem,index)=>(
              <Card key={index} {...elem}/>
           ))}
       </MDBRow>
    </MDBContainer>
    </> 
  )
}

export default Profile