import { Dialog } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,handleClose,delteHandler}) => {
  return <Dialog open={open} onClose={handleClose}>  
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are You Sure Want To Delete This Group....??
        </DialogContentText>
    </DialogContent>
  </Dialog>
}

export default ConfirmDeleteDialog