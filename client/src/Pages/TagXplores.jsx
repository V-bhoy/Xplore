import React,{useEffect} from 'react';
import { MDBCard , MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol , MDBBtn, MDBIcon, MDBCardGroup, MDBContainer} from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useDispatch , useSelector} from 'react-redux';
import { tagxplore } from '../redux/features/xploreSlice';
import { excerpt } from '../redux/utility';
import Styles from '../Styles/Tags.module.css';
import emoji from '../Images/tag.png'
import Card from '../Components/Card';


const TagXplores = () => {
    const {tagXplores, loading} = useSelector((state)=>({...state.xplore}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tag } = useParams();

    useEffect(()=>{
        if(tag){
            dispatch(tagxplore(tag));
        }
    },[tag])

   if(loading){
       return <Spinner />
   }
  return (
    <div style={{ marginTop: "100px" }}>
        <h3 className={`text-center ${Styles.head}`}> 
        <img src={emoji} className={Styles.emoji} alt="tag"/>
        Xplores with : <span>#{tag}</span></h3>
        <hr/>
        <MDBContainer>
            <MDBRow className='row-cols-md-2 row-cols-lg-3 row-cols-sm-1 g-4'>
        
        {tagXplores.map((elem,index)=>(
           <Card key={index} {...elem}/>
        ))}
        </MDBRow>
        </MDBContainer>
    </div>
  )
}

export default TagXplores