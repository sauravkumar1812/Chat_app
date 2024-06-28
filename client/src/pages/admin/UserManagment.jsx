import React,{useEffect, useState} from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import {transformImage} from "../../lib/features"

const columns = [{
    field: 'id',
    headerName: 'ID',
   headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) =>  <Avatar s alt={params.row.name}  src={params.row.avatar}   style={{ width: 50, height: 50, borderRadius: '50%' }} />
    
  },
  {
    field: 'name',
    headerName: ' Name',
    headerClassName: 'table-header',
    width: 200,
    editable: true
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: 200,
    editable: true
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: 150,
    editable: true
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: 150,
    editable: true
  },
]

const UserManagment = () => {
  const [rows, setRows] = useState([])

  useEffect(() => { 
   setRows(dashboardData.users.map(i=> ({...i,id:i._id,avatar:transformImage(i.avatar,50)})))
  
  },[])
  return (
    <AdminLayout>
        <Table heading={"All Users"} columns ={columns} rows={rows} />
    </AdminLayout>
  )
}

export default UserManagment