import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        subheader: t(tokens.nav.concepts),
        items: [
          {
            title: t(tokens.nav.customers),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.list),
                path: paths.dashboard.customers.index
              },
              {
                title: t(tokens.nav.details),
                path: paths.dashboard.customers.details
              },
              {
                title: t(tokens.nav.edit),
                path: paths.dashboard.customers.edit
              }
            ]
          },
        ]
      },
      {
        subheader: t(tokens.nav.pages),
      },
    ];
  }, [t]);
};
