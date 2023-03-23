import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LinkExternal01Icon from '@untitled-ui/icons-react/build/esm/LinkExternal01';

const features = [
  {
    id: 'experts',
    title: 'Built by experts',
    description: 'All of the code follows MUI best practices, it’s written by our in-house team of experts.',
    imageDark: '/assets/home-features-experts-dark.png',
    imageLight: '/assets/home-features-experts-light.png'
  },
  {
    id: 'figma',
    title: 'Design Files',
    description: 'We\'ve included the source Figma files to Plus & Extended licenses so you can get creative! Build layouts with confidence.',
    imageDark: '/assets/home-features-figma-dark.png',
    imageLight: '/assets/home-features-figma-light.png'
  },
  {
    id: 'tech',
    title: 'Built with modern technologies',
    description: 'Each template is a well-structured CRA & Next.js project, giving you a codebase that’s productive and enjoyable to work in.',
    imageDark: '/assets/home-features-tech-dark.png',
    imageLight: '/assets/home-features-tech-light.png'
  },
  {
    id: 'customize',
    title: 'Easy to customize',
    description: 'Everything is styled using global theme overrides, just open the theme file in your editor and change whatever you want.',
    imageDark: '/assets/home-features-customize-dark.png',
    imageLight: '/assets/home-features-customize-light.png'
  },
  {
    id: 'productive',
    title: 'Built with CRA & Next.js',
    description: 'Well-structured, thoughtfully componentized CRA & Next.js project, giving you a codebase that’s productive and enjoyable to work in.',
    imageDark: '/assets/home-features-nextjs-dark.png',
    imageLight: '/assets/home-features-nextjs-light.png'
  }
];

export const HomeFeatures = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;

  return (
    <>
    </>
  );
};
