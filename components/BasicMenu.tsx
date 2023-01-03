import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineMenu } from 'react-icons/ai';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function BasicMenu() {
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    user ?
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

          <MenuItem onClick={handleClose}>
            <Link href="/api/auth/logout">
              LOG OUT
            </Link>
          </MenuItem>
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
          {/* <MenuItem onClick={handleClose}>
            <Link href="/report">
              CAMPAIGN REPORT
            </Link>
          </MenuItem> */}
        </Menu>
      </div> :
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

          <MenuItem onClick={handleClose}>
            <Link href="/api/auth/login">
              LOG IN
            </Link>
          </MenuItem>
        </Menu>
      </div>
  );
}