import {usePage} from '@inertiajs/react';
import {PropsWithChildren, ReactNode} from 'react';
import {useNotification} from "@/Context/NotificationContext";
import {AppShell, Burger, Group, Notification} from '@mantine/core';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import TopNav from "@/Components/TopNav";
import SideNav from "@/Components/SideNav";


export default function Authenticated({
                                          header,
                                          children,
                                      }: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const {showNotification, notificationMessage, notificationTitle, notificationColor} = useNotification();
    const [opened, {toggle}] = useDisclosure();

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <div className="flex items-center justify-between h-full w-full">
                        <div>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                            {useMediaQuery('(min-width: 56.25em)') && <h1>Logo</h1>}
                        </div>
                        <TopNav user={user}/>
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <SideNav/>
            </AppShell.Navbar>
            <AppShell.Main>
                <div className="fixed right-4 z-50">
                    {showNotification && (
                        <Notification withCloseButton={false} color={notificationColor} title={notificationTitle}
                                      className="w-96">
                            {notificationMessage}
                        </Notification>
                    )}
                </div>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
