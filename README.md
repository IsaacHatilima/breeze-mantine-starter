import React from 'react';
import {Box, NavLink} from '@mantine/core';
import {MdSpaceDashboard} from 'react-icons/md';
import {usePage} from '@inertiajs/react';

const data = [
{icon: MdSpaceDashboard, label: 'Dashboard', href: route('dashboard')},
];

export default function SideNav() {
const {url} = usePage();

    const items = data.map((item) => {
        const itemPath = new URL(item.href, window.location.origin).pathname;
        const currentPath = new URL(url, window.location.origin).pathname;

        return (
            <NavLink
                href={item.href}
                key={item.label}
                active={itemPath === currentPath}
                label={item.label}
                leftSection={<item.icon size="1rem"/>}
                className="rounded-md"
            />
        );
    });

    return (
        <>
            Navbar
            <Box className="w-full mt-2">{items}</Box>
            <NavLink
                href="#required-for-focus"
                label="First parent link"
                leftSection={<MdSpaceDashboard size="1rem"/>}
                childrenOffset={28}

            >
                <NavLink label="First child link" href="#required-for-focus"/>
                <NavLink label="Second child link" href="#required-for-focus"/>
                <NavLink label="Third child link" href="#required-for-focus"/>
            </NavLink>
        </>
    );

}
