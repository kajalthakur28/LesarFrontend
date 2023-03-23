import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Logo } from 'src/components/logo';
import { RouterLink } from 'src/components/router-link';
import { usePathname } from 'src/hooks/use-pathname';
import { useWindowScroll } from 'src/hooks/use-window-scroll';
import { paths } from 'src/paths';
import { PagesPopover } from './pages-popover';
import { TopNavItem } from './top-nav-item';

const items = [];

const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onMobileNavOpen } = props;
  const pathname = usePathname();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [elevate, setElevate] = useState(false);
  const offset = 64;
  const delay = 100;

  const handleWindowScroll = useCallback(() => {
    if (window.scrollY > offset) {
      setElevate(true);
    } else {
      setElevate(false);
    }
  }, []);

  useWindowScroll({
    handler: handleWindowScroll,
    delay
  });

  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        pt: 2,
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func
};
