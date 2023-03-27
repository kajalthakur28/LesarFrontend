import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const CustomerBasicDetails = (props) => {
  // const { gender, date_assigned_to_cbo, cbo, primary_case_manager, secondary_case_manager, items = [], ...other } = props;
  const { gender, date_assigned_to_cbo, cbo, primary_case_manager, secondary_case_manager, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <PropertyList>
        {/* {items.map((customer) => {
          const date_assigned_to_cbo = `${customer.date_assigned_to_cbo}`;
          const gender = `${customer.gender}`;
          const cbo = `${customer.cbo}`;
          const primary_case_manager = `${customer.primary_case_manager}`;
          const secondary_case_manager = `${customer.secondary_case_manager}`;
          return (
            <React.Fragment key={customer.id}> */}
              <PropertyListItem
                divider
                label="Gender"
                value={gender}
              />
              <PropertyListItem
                divider
                label="Date Assigned to CBO"
                value={date_assigned_to_cbo}
              />
              <PropertyListItem
                divider
                label="CBO"
                value={cbo}
              />
              <PropertyListItem
                divider
                label="Primary Case Manager"
                value={primary_case_manager}
              />
              <PropertyListItem
                divider
                label="Secondary Case Manager"
                value={secondary_case_manager}
              />
            {/* </React.Fragment>
          );
        })} */}
      </PropertyList>
      <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          Reset Password
        </Button>
      </CardActions>
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  // items: PropTypes.array,
  gender: PropTypes.string,
  date_assigned_to_cbo: PropTypes.string,
  cbo: PropTypes.string,
  primary_case_manager: PropTypes.string,
  secondary_case_manager: PropTypes.string
};
