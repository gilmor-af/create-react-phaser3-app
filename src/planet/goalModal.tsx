import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ListItemText, List } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '30%',
  width: '30%',
  overflowY: 'auto',
  bgcolor: '#7ad142e0',
  // fontFamily: 'monospace',
  boxShadow: 24,
  p: 4,
};

export default function GoalModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (props.isOpen) setOpen(true);
    console.log(props);
  }, [props.isOpen]);

  if(props.dynData) {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {props.dynData.name} - Q&As
            </Typography>
            <br/>
            {props.dynData.questions.map((q: any) => <Accordion key={q.question_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{q.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {props.dynData.answers.filter((a: any) => a.question_id == q.question_id).map((a: any) =>
                    <ListItemText key={a.id} primary={'- ' + a.answer} />
                  )}
                </List>
                
              </AccordionDetails>
            </Accordion>)}
          </Box>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          </Box>
        </Modal>
    </div>
  )
}