import { Box, Typography } from "@mui/material";
import { ReactComponentElement, ReactNode } from "react";
import Modal from '@mui/material/Modal';

type Props = {
   
    element:ReactNode;
    active:boolean;
    setActive:(active: boolean) => void
}

const ModalWindow:React.FC<Props> = ({active,setActive,element}) => {

    const handleClose = () => setActive(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    return <Modal
    open={active}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {element}
    </Box>
  </Modal>
}

export default ModalWindow;