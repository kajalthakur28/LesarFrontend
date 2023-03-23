import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { tokens } from 'src/locales/tokens';

const languageOptions = {};

export const LanguagePopover = (props) => {
  const { anchorEl, onClose, open = false, ...other } = props;
  const { i18n, t } = useTranslation();

  const handleChange = useCallback(async (language) => {
    onClose?.();
    await i18n.changeLanguage(language);
    const message = t(tokens.common.languageChanged);
    toast.success(message);
  }, [onClose, i18n, t]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 220 } }}
      {...other}>
    </Popover>
  );
};

LanguagePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
