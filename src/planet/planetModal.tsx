import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import Flow from './flow';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: "60%",
  width: "60%",
  bgcolor: '#00c2ffe0',
  // fontFamily: 'monospace',
  border: '1px solid #0000003d',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (props.isOpen) setOpen(true);
    console.log(props);
  }, [props.isOpen]);


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Reflection: {props.dynData.name}
          </Typography>
          <Flow></Flow>
        </Box>
      </Modal>
    </div>
  );
}