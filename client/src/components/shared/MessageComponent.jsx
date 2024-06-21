import { Typography } from '@mui/material';
import React, { memo } from 'react';
import { lightblue } from '../../constants/color';
import moment from 'moment';

const MessageComponent = ({message,user}) => {
    const {sender,content,attachments =[],createdAt}= message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();
  return <div
  style={{
    alignSelf:sameSender?"flex-end":"flex-start",
    backgroundColor:"white",
    color:"black",
    borderRadius:"5px",
    padding:"0.5rem",
    width:"fit-content"
  }}
  >{!sameSender && <Typography color={lightblue} fontWeight={"600"} variant='caption'>{sender.name}</Typography>}
   {content && <Typography>{content}</Typography>}

   <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
  </div>
}

export default memo(MessageComponent)