import React from 'react';
import {Box, NavLink} from '@mantine/core';
import {MdSettings, MdSpaceDashboard} from 'react-icons/md';
import {Link, usePage} from '@inertiajs/react';

const data = [
    {icon: MdSpaceDashboard, label: 'Dashboard', href: route('dashboard'), children: []},
    {
        icon: MdSettings, label: 'Settings', href: "#", children: [
            {label: 'Profile', href: route('profile.edit')},
            {label: 'Security', href: route('destroy.view')}
        ]
    },
    {
        icon: MdSettings, label: 'Some Title', href: "#", children: [
            {label: 'Title 1', href: route('two-factor.auth')},
        ]
    },
];

export default function SideNav() {
    const {url} = usePage();

    const items = data.map((item) => {
        const itemPath = new URL(item.href, window.location.origin).pathname;
        const currentPath = new URL(url, window.location.origin).pathname;

        const isChildActive = item.children.some(child => {
            const childPath = new URL(child.href, window.location.origin).pathname;
            return childPath === currentPath;
        });

        const isActive = itemPath === currentPath || isChildActive;

        return (
            <NavLink
                key={item.label}
                href={item.href}
                active={isActive}
                label={item.label}
                leftSection={<item.icon size="1rem"/>}
                defaultOpened={isChildActive}
                component={Link}
            >
                {item.children && item.children.length > 0 && (
                    item.children.map((child) => {
                        const childPath = new URL(child.href, window.location.origin).pathname;
                        return (
                            <NavLink
                                key={child.label}
                                href={child.href}
                                active={childPath === currentPath}
                                label={child.label}
                                className="pl-8"
                                component={Link}
                            />
                        );
                    })
                )}
            </NavLink>
        );
    });

    return (
        <>
            Navbar
            <Box className="w-full mt-2">{items}</Box>
        </>
    );
}
