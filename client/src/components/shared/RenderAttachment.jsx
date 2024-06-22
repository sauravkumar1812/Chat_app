import React from 'react'

const RenderAttachment = (file,url) => {
  switch (file) {
    case "video":
         <video src={url} preload='none' width={"200px"} controls/>
        break;
        case "image":
            <img src={url} alt="Attachment" />
           break;
    default:
        break;
  }
}

export default RenderAttachment