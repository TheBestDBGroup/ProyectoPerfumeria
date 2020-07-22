import React from 'react';
import './custom-dialog-styles.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//Dialog para aceptar o rechazar algo
const customDialog = ({handleClose,handleSubmit,open,title,content}) => (
	
	<>
		<Dialog
	        open={open}
	        onClose={handleClose}
	        aria-labelledby="alert-dialog-title"
	        aria-describedby="alert-dialog-description"
      	>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Si
          </Button>
        </DialogActions>
      	</Dialog>
	</>

)

export default customDialog