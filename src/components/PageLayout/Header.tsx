

"use client";
import { useSelector } from '@/store/hooks';
import { getLocalStorage } from '@/utils/helperFunctions';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DownArrow from '../../assets/images/down-arrow.png';
import Hamburger from '../../assets/images/hamburger.png';

interface HeaderProps {
    toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
    const user = getLocalStorage();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState<string | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const open = Boolean(anchorEl);

    const imgUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}user-image/`;
    const selector = useSelector((state) => state.MainUserReducer.updatedUserData);


    useEffect(() => {
        if (selector?.body?.id) {
            setName(`${selector?.body?.firstName} ${selector?.body?.lastName}`);
            setEmail(`${selector?.body?.email}`);
            setImg(selector?.body?.image && selector?.body?.image.length > 1 ? imgUrl + selector?.body?.image : null);
            setRoleId(selector?.body?.roleId);
        }
    }, [selector]);

    useEffect(() => {
        if (user) {
            setName(`${user.firstName} ${user.lastName}`);
            setEmail(`${user.email}`);
            setImg(user.image && user.image.length > 1 ? imgUrl + user.image : null);
            setRoleId(user.roleId);
        }
    }, []);

    const getInitials = () => {
        if (user && user.hasOwnProperty('firstName')) {
            return user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
        }
        return "";
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/'; // Redirect to home or login page after logout
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='flex justify-end items-center relative'>
            <div className="md:hidden bg-gray-100 h-fit pl-3">
                <button onClick={toggleDrawer} className="text-white">
                    <Image src={Hamburger} alt='hamburger-icon' className='w-7' />
                </button>
            </div>
            <header className="p-2 flex justify-end items-center sm:mr-4 w-full">
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            {img ? (
                                <Avatar src={img} sx={{ width: 40, height: 40 }} />
                            ) : (
                                <Avatar sx={{ width: 40, height: 40, backgroundColor: '#006838' }}>{getInitials()}</Avatar>
                            )}
                            <div className='text-black text-start ml-2 hidden sm:block'>
                                <p className="text-[12px] xl:text-[14px] font-semibold 2xl:text-[16px]">{name}</p>
                                <p className=" text-[10px] xl:text-[12px] 2xl:text-[12px] font-light">{email}</p>
                            </div>
                            <Image src={DownArrow} alt="down-arrow" className='hidden sm:block ml-2 w-5 cursor-pointer' />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {[
                        <MenuItem key="profile" onClick={() => { router.push(roleId === 1 ? "/profile" : "/admin/profile") }}>
                            <PersonIcon className="mr-3" /> Profile
                        </MenuItem>,
                        <Divider key="divider" />,
                        <MenuItem key="settings" onClick={() => { router.push(roleId === 1 ? "/settings" : "/admin/settings") }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>,
                        <Divider key="divider-logout" />,
                        <MenuItem key="logout" onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    ]}
                </Menu>
            </header>
        </div>
    );
};

export default Header;
