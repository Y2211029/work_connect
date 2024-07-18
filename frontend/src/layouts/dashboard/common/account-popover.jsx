import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { account } from 'src/_mock/account';

const MENU_OPTIONS = [
  {
    label: 'プロフィール',
    path: '/Profile',
    icon: 'eva:person-fill',
  },
  {
    label: '設定',
    path: '/Settings',
    icon: 'eva:settings-2-fill',
  },
];

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate(); // useNavigateをAccountPopover関数の内部で呼び出す

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('ログアウトしますか？');
    if (confirmed) {
      sessionStorage.removeItem('accountData');
      alert('ログアウトしました。');
      window.location.reload();
    }
  }

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  const sessionData = sessionStorage.getItem('accountData');
  let user_name = "";
  let mail = "";
  let login_state = false;
  if(sessionData){
    const accountData = JSON.parse(sessionData);
    user_name = accountData.user_name;
    mail = accountData.mail;
    if(user_name && mail){
      login_state = true;
    }
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user_name != "" && login_state == true ? user_name : account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {mail != "" && login_state == true ? mail : ""}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', display: login_state ? 'block' : 'none' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleMenuItemClick(option.path)}
            sx={{ display: login_state ? 'block' : 'none' }}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0, display: login_state ? 'block' : 'none' }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5, display: login_state ? 'block' : 'none' }}
        >
          ログアウト
        </MenuItem>

      </Popover>
    </>
  );
}