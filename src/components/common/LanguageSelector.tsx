import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  alpha,
  Tooltip
} from '@mui/material';
import { Language, ExpandMore } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Cambiar idioma" placement="bottom" arrow>
        <IconButton
          onClick={handleClick}
          sx={{
            color: theme.palette.text.primary,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            padding: 1,
            minWidth: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.1),
              borderColor: alpha(theme.palette.primary.main, 0.4),
              transform: 'translateY(-1px)',
            },
          }}
        >
          <motion.span
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Language sx={{ fontSize: 20 }} />
          </motion.span>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {currentLanguage.code}
          </Typography>
          <motion.div
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExpandMore sx={{ fontSize: 16 }} />
          </motion.div>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            background: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            minWidth: 150,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
            '& .MuiMenuItem-root': {
              borderRadius: 1,
              margin: '4px 8px',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.1),
              },
            },
          },
        }}
      >
        <AnimatePresence>
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MenuItem
                onClick={() => handleLanguageChange(language.code)}
                selected={language.code === currentLanguage.code}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: '1.2rem' }}>
                  {language.flag}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: language.code === currentLanguage.code ? 600 : 400,
                    color: language.code === currentLanguage.code 
                      ? theme.palette.primary.main 
                      : theme.palette.text.primary,
                  }}
                >
                  {language.name}
                </Typography>
              </MenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Menu>
    </>
  );
};

export default LanguageSelector;
