import React,{useEffect, useState} from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { transformImage } from '../../lib/features'
import moment from 'moment'
import { Avatar, Stack } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'

const columns = [{
  field: 'id',
  headerName: 'ID',
 headerClassName: 'table-header',
  width: 200
},
{
  field: 'attachments',
  headerName: 'Attachments',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params) =>  <Avatar s alt={params.row.name}  src={params.row.avatar}   style={{ width: 50, height: 50, borderRadius: '50%' }} />
  
},
{
  field: 'content',
  headerName: ' Conetent',
  headerClassName: 'table-header',
  width: 400,
  editable: true
},
{
  field: 'sender',
  headerName: 'Send By',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params) => <Stack>
     <Avatar  alt={params.row.sender.name}  src={params.row.sender.avatar}  />
     <span>{params.row.sender.name}</span>
  </Stack>
  
},
{
  field: 'chat',
  headerName: 'Chat',
  headerClassName: 'table-header',
  width: 220,
  editable: true
},
{
  field: 'groupchat',
  headerName: 'Group Chat',
  headerClassName: 'table-header',
  width: 150,
  editable: true
},
{
  field:"createdAt",
  headerName:"Time",    
  headerClassName: 'table-header',
  width: 250,
}
]
const MessageManagment = () => {
  const [rows, setRows] = useState([]);
 
   useEffect(()=>{
      setRows(dashboardData.messages.map(i=> ({...i,id:i._id,sender:{
        name:i.sender.name,
        avatar:transformImage(i.sender.avatar,50)
      },
       createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")  
    
    })))
   },[])

  return (
    <AdminLayout>
        <Table heading={"All Messages"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default MessageManagment