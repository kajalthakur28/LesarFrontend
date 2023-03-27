import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { customersApi } from 'src/api/customers';
import { useMounted } from 'src/hooks/use-mounted';

const emailOptions = [
  'Resend last invoice',
  'Send password reset',
  'Send verification'
];

const useEmails = () => {
  const isMounted = useMounted();
  const [emails, setEmails] = useState([]);

  const handleEmailsGet = useCallback(async () => {
    try {
      const response = await customersApi.getEmails();

      if (isMounted()) {
        setEmails(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      handleEmailsGet();
    },
    // eslint-disable-next-line
    []);

  return emails;
};

export const CustomerEmailsSummary = (props) => {
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const emails = useEmails();

  return (
    <>
    </>
  );
};
