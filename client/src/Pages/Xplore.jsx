import React,{useEffect} from 'react'
import { MDBCard,MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn, MDBTooltip } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getrelatedxplore, getsinglexplore} from '../redux/features/xploreSlice';
import Related from '../Components/Related';
import Styles from '../Styles/Xplore.module.css';
import fav from '../Images/fav.png';


const Xplore = () => {
    const dispatch = useDispatch();
    const {xplore, relatedXplores} = useSelector((state)=>({...state.xplore}))
   
    const {id} = useParams();
    const tags = xplore?.tags;
    console.log(xplore);

    useEffect(()=>{
         tags &&  dispatch(getrelatedxplore(tags));
    },[tags])


    useEffect(()=>{
        if(id){
            dispatch(getsinglexplore(id));
        }
    },[id])



  return (
    <div className={Styles.wrapper}>
      <MDBContainer>
          <MDBCard>
            <div className='bg-image hover-zoom hover-overlay'>
             <MDBCardImage position='top' className={Styles.image} src={xplore.imageUrl} alt={xplore.title}/>
            <div className={`mask ${Styles.box}`} style={{background: 'rgba(4,4,4,0.3)'}}>
                <p>Click to add to your favourites<img src={fav} alt='fav' className={Styles.emoji}/></p>
            </div>
            </div>
             <div className={`text-start ${Styles.creator}`}>Created By: {xplore.creator}</div>
             <MDBCardBody>
                
                <h3 className={Styles.title}>{xplore.title}</h3>
                <div>
                    <span className={`text-start ${Styles.tag}`}>
                         {xplore && xplore.tags && xplore.tags.map((elem)=>(
                            `#${elem} `
                         ))}
                    </span>
                </div>
                <br/>
                
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon far icon="calendar-alt" size="lg" style={{marginRight:"0.4rem"}}/>
                    <small className='text-muted'>
                        {moment(xplore.createdAt).fromNow()}
                    </small>
                  
                </MDBCardText>
                
                <MDBCardText className={`${Styles.location}`}>
                    Location -  {xplore.location}
                </MDBCardText>
                <MDBCardText className={`${Styles.desc} mb-5`}>
                      {xplore.description}
                </MDBCardText>
             </MDBCardBody>
          </MDBCard>
          <div className='mt-4 mb-2'>
            <Related relatedXplores={relatedXplores} xploreId={id}/>
          </div>      
      </MDBContainer>
    
    </div>
  )
}

export default Xplore