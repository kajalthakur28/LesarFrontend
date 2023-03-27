import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { useUpdateEffect } from 'src/hooks/use-update-effect';


const tabs = [];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total orders (highest)',
    value: 'totalOrders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'totalOrders|asc'
  }
];

export const CustomerListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        hasAcceptedMarketing: undefined,
        isProspect: undefined,
        isReturning: undefined
      };

      if (value !== 'all') {
        updatedFilters[value] = true;
      }

      return updatedFilters;
    });
  }, []);

  async function getToken(email, password) {
    const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.access;
  }
  
  const handleQueryChange = useCallback(async (event) => {
    event.preventDefault();
    const query = queryRef.current?.value;
  
    const enrollmentStatus = filters.enrollmentStatus;
    const enrollmentDate = filters.enrollmentDate;
    const assignedCbo = filters.assignedCbo;
    const dateAssignedToCbo = filters.dateAssignedToCbo;
    const primaryCaseManager = filters.primaryCaseManager;
    const secondaryCaseManager = filters.secondaryCaseManager;
  
    const searchParams = new URLSearchParams({ member_id: query });
  
    if (enrollmentStatus) {
      searchParams.append('enrollment_status', enrollmentStatus);
    }
    if (enrollmentDate) {
      searchParams.append('enrollment_date', enrollmentDate);
    }
    if (assignedCbo) {
      searchParams.append('assigned_cbo', assignedCbo);
    }
    if (dateAssignedToCbo) {
      searchParams.append('date_assigned_to_cbo', dateAssignedToCbo);
    }
    if (primaryCaseManager) {
      searchParams.append('primary_case_manager', primaryCaseManager);
    }
    if (secondaryCaseManager) {
      searchParams.append('secondary_case_manager', secondaryCaseManager);
    }
    
    const email = 'admin3@b2.com';
    const password = 'asdqwe123';
    const token = await getToken(email, password);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `jwt ${token}`);
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(`http://127.0.0.1:8000/api/management/member_search/?${searchParams.toString()}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("a",data)
        setSearchResults(data.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, [filters]);
  
  const handleSortChange = useCallback((event) => {
    const [sortBy, sortDir] = event.target.value.split('|');

    onSortChange?.({
      sortBy,
      sortDir
    });
  }, [onSortChange]);

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
      >
        <Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search Members"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
