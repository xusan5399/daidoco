import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

export default function FloatingActionButtons() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16, // distance from the bottom of the screen
        right: 16, // distance from the right side of the screen
        "& > :not(style)": { m: 1 },
      }}
    >
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    </Box>
  );
}
