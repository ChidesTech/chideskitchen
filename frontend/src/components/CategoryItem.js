import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';


const ProjectItemStyles = styled.div`
.project-img{
    width: 100%;
    height:80px;
    overflow:hidden;
    border: 1px solid white;
    display:inline-block;
      background:orangered; 
    img{
        height:100%;
        object-fit: fill;
 }
 border-radius: 7px


}


.project-info{
    background-color: transparent;
    padding:1rem;
    border-radius:12px;
    border: 1px solid white;

}
.project-title{
    font-size:1.6rem;
    text-align:center;
    position:relative;
    margin-top:-1rem;
    z-index: 10;
    margin-top:-6.3rem;
    color: white;
}
.project-description{
    font-size:2.2rem;
    font-family: "RobotoMono Regular";
}

@media only screen and (max-width: 768px){
    .project-img{
         height: 60px;
         background:orangered; 
        
     }
     .project-title{
      
      margin-top:-6rem;
     
  }
}
`

  const ProjectItem  = ({
  img= "", title= "", desc='', url=""
}) => {
    return (
      <ProjectItemStyles>
      <>
      <Link to={url} className="project-img">
          <div className="project-img" src={img} alt=""/>
      </Link>
    
       <div className="project-info">
           <Link to={url}>
            <h3 className="project-title">{title}</h3>
           </Link>
           {/* <p className="project-desc">
               {desc}
           </p> */}
          
        </div>
        </>
       

      </ProjectItemStyles>
    );
  }
  
  
  export default ProjectItem ;