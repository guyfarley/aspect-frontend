import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineMenu } from 'react-icons/ai';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AiOutlineMenu className="text-black text-3xl mr-[2px] mt-[4px] md:hidden" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>LOG IN</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            href="/get-install">
            FIND INSTALL
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/create-install">
            CREATE INSTALL
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/report">
            CAMPAIGN REPORT
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}