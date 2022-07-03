import React,{useEffect} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getxplore , setCurrentPage} from '../redux/features/xploreSlice';
import Card from '../Components/Card';
import Spinner from '../Components/Spinner';
import Pagination from '../Components/Pagination';
import sad from '../Images/sad.png'

const Home = () => {
  const {xplores, loading, currentPage, numberOfPages } = useSelector((state)=>({...state.xplore}));
  console.log(xplores);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getxplore(currentPage));
  },[currentPage])

  if(loading){
    return <Spinner />
  }

  return (
    <div>
       <MDBRow className='mt-5'>
          {xplores.length===0 && (
            <MDBTypography className='text-center mb-0' tag='h2' style={{marginTop:"150px"}}>
               No Xplores Found <img src={sad} alt="sad" style={{width:"50px", marginTop:"-1rem", marginLeft:"0.5rem"}}/>
            </MDBTypography>
          )}  
          <MDBCol className='mt-5 mb-5'>
              <MDBContainer>
                <MDBRow className={`row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-5 `}>
                     {xplores && xplores.map((elem,index)=>(
                           <Card key={index} {...elem}/>
                     ))}
                </MDBRow>
              </MDBContainer>
          </MDBCol>
       </MDBRow>
       <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} dispatch={dispatch} currentPage={currentPage}/>
    </div> 
  )
}

export default Home