import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

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
  return (
    <AdminLayout>
        <div>MessageManagment</div>
    </AdminLayout>
  )
}

export default MessageManagment