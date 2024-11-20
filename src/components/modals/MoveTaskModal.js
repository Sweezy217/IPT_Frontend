import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useTaskContext } from "../hooks/useTaskContext";

const MoveTaskModal = ({
  open,
  onClose,
  sections,
  onMoveTask,
  selectedSection,
  setSelectedSection,
}) => {
  console.log("selectedSectionselectedSection", selectedSection);

  const handleMoveTask = () => {
    if (selectedSection) {
      onMoveTask(selectedSection);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Move Task
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* sections Selection */}
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel id="workspace-label">Select Section</InputLabel>
          <Select
            labelId="sections-label"
            id="sections-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            label="Select Section"
          >
            {sections.map((section) => (
              <MenuItem key={section.id} value={section.name}>
                {section.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Modal Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleMoveTask}
            color="primary"
            variant="contained"
            disabled={!selectedSection}
          >
            Move Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MoveTaskModal;
