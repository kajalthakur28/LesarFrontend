import * as React from 'react';
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
  TextField,
  Button,
  Backdrop,
  Modal,
  Fade,
  Typography
} from '@mui/material';
import { useUpdateEffect } from 'src/hooks/use-update-effect';
// import { result } from 'lodash';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 500,
  bgcolor: "#fff",
  borderRadius: 2,
};

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
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  }, []);

  const handleSortChange = useCallback((event) => {
    const [sortBy, sortDir] = event.target.value.split('|');

    onSortChange?.({
      sortBy,
      sortDir
    });
  }, [onSortChange]);
 
  const getDataFromAPI = useCallback(async () => {
    console.log("Options Fetched from API")
 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5OTgxNjMwLCJpYXQiOjE2Nzk4OTUyMzAsImp0aSI6IjQyN2I1NWU5MzFjMjQ0ZmJhNDc1MTA3MGQzNTg2MmZhIiwidXNlcl9pZCI6MX0.YORamWmwXkeyRnWEU949_GUKFHGhL-guL25tqx-WWB0");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var responce = await fetch("http://127.0.0.1:8000/api/management/member_search/?", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result)
      return result;
      })
      .catch(error => console.log('error', error));

      var obj = JSON.parse(responce)
      console.log(obj.data, 'hihihihihihi--------')
  })

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
            <Button
              startIcon={(
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              )}
              variant="contained"
              onClick={handleOpen}
            >
              Search Members
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box sx={style}>
                <Typography sx={{ mt:2, ml:22, fontSize: 25, fontWeight: 600 }}>
                  Search
                </Typography>
                <Typography sx={{ mt: 2, ml:5 }}>
                  {/* Name */}
                <TextField sx={{ width: 200, ml: 10, mt: 2 }} id="standard-basic" label="Member Name" />
                {/* <TextField sx={{ width: 200, ml: 10, mt: 2 }} id="standard-basic" label="" />
                <TextField sx={{ width: 200, ml: 10, mt: 2 }} id="standard-basic" label="" />
                <TextField sx={{ width: 200, ml: 10, mt: 2 }} id="standard-basic" label="" /> */}
                </Typography>
                <Button
                  startIcon={(
                    <SvgIcon>
                      <SearchMdIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{ mt: 32, ml: 21 }}
                  onClick={getDataFromAPI}
                >
                  {/* Search Members */}
                  Search
                </Button>
              </Box>
            </Modal>
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
