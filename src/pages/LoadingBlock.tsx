import React from 'react'
import ContentLoader from "react-content-loader"


 export const LoadingBlock =() => {
  return (


<ContentLoader 
    speed={0}
    width={400}
    height={360}
    viewBox="0 0 500 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="3" y="252" rx="27" ry="27" width="400" height="44" /> 
    <circle cx="47" cy="336" r="24" /> 
    <rect x="81" y="306" rx="26" ry="26" width="199" height="55" /> 
    <rect x="6" y="55" rx="30" ry="30" width="400" height="190" />
  </ContentLoader>
 


  
);
}

