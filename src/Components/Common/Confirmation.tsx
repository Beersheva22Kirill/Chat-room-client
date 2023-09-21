import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

type Props = {
    question:string;
    content:string;
    active:boolean;
    setActive:(active: boolean) => void
    callbackAgree: () => void
}

const Confirmation:React.FC<Props> = ({content,question,active,setActive, callbackAgree}) => {
    

    const handleClose = () => {
        setActive(false);
      };

      const handleAgree= () => {
        callbackAgree()
        setActive(false);
      };

    return <Dialog
    open={active}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {question}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Disagree</Button>
      <Button onClick={handleAgree} autoFocus>Agree</Button>
    </DialogActions>
  </Dialog>
}

export default Confirmation;