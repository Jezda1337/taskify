import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  selectedIndex: number;
}

export function a11yPropsTabs(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function TabPanel(props: TabPanelProps) {
  const { children, selectedIndex, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedIndex !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {selectedIndex === index ? (
        <Box>
          <Typography component='div'>{children}</Typography>
        </Box>
      ) : null}
    </div>
  );
}
