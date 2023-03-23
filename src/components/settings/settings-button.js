import { Box, Tooltip } from '@mui/material';

export const SettingsButton = (props) => (
  <Tooltip title="Settings">
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '50%',
        bottom: 0,
        boxShadow: 16,
        margin: (theme) => theme.spacing(4),
        position: 'fixed',
        right: 0,
        zIndex: (theme) => theme.zIndex.speedDial
      }}
      {...props}>
    </Box>
  </Tooltip>
);
