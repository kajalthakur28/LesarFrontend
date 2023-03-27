import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';

export const CustomerDataManagement = (props) => (
  <Card {...props}>
    {/* <CardHeader title="Data Management" /> */}
    <CardContent sx={{ pt: 0 }}>
      <Button
        color="error"
        variant="outlined"
      >
        Delete Account
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          <h5>Remove this member's chart if he requested that, if not
          please be aware that what has been deleted can never brought
          back</h5>
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
