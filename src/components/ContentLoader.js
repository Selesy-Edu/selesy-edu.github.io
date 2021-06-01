import React, {Suspense, useEffect, useState}  from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadContent} from '../actions'

import {useDatabase} from 'reactfire'

const ContentLoader = (props) => {
  const [contentLoaded, setContentLoaded] = useState(false)

  const db = useDatabase();

  useEffect(()=>{
    if(!contentLoaded){
      if(props.degree !== 'undefined'){
        db.ref().child("/content/"+props.degree+"/"+props.userInfo.progress.current+"/").get().then((snapshot) => {
          console.log("/content/"+props.degree+"/"+props.userInfo.progress.current+"/")
          if (snapshot.exists()) {
            props.loadContent(snapshot.val())
            setContentLoaded(true)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  })

  return(
    <></>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loadUserInfo,
  };
}

ContentLoader.propTypes = {
  degree: PropTypes.string
}

ContentLoader.defaultProps = {
  degree: 'primero',
}

export default connect(mapStateToProps,{loadContent})(ContentLoader);
