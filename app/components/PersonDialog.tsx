//'use client'

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Person } from "../lib/person";
import dayjs from "dayjs";


interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({
  open,
  handleClose,
  currentPerson,
  setCurrentPerson,
  handleSubmit,
}) => {
  const [dateOpen, setDateOpen] = React.useState(false);
  return (
  
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{currentPerson ? "Edit Person" : "Add Person"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          fullWidth
          value={currentPerson?.firstname || ""}
          onChange={(e) =>
            setCurrentPerson((prev) => ({ ...prev!, firstname: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          label="Last Name"
          fullWidth
          value={currentPerson?.lastname || ""}
          onChange={(e) =>
            setCurrentPerson((prev) => ({ ...prev!, lastname: e.target.value }))
          }
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={currentPerson?.phone || ""}
          onChange={(e) =>
            setCurrentPerson((prev) => ({ ...prev!, phone: e.target.value }))
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            open={dateOpen}
            onClose={()=>setDateOpen(false)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "medium",
                error: currentPerson && !currentPerson?.date_of_birth ? true : false,
                onClick: () => setDateOpen(true),
              },
            }}
            value={
              currentPerson ? dayjs(currentPerson?.date_of_birth) : dayjs("")
            }
            onChange={(value) => {
              setCurrentPerson((prev) => ({ ...prev!, date_of_birth: value }));
            }}
          />
        </LocalizationProvider>
  
        {/* <DateRange label="Basic date picker" /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {currentPerson ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PersonDialog;
