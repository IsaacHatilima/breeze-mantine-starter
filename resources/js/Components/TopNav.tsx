import {ActionIcon, Menu} from "@mantine/core";
import {Link} from "@inertiajs/react";
import {User} from "@/types";
import {CiUser} from "react-icons/ci";

export default function TopNav({user}: { user: User }) {
    return (
        <>
            <div className="pr-4">
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon variant="outline" size="xl" radius="xl">
                            <CiUser style={{width: '60%', height: '60%'}}/>
                        </ActionIcon>
                    </Menu.Target>

                    {/* <Menu.Dropdown>
                        <Menu.Item>
                            <Link href={route('profile.edit')} className="block w-full h-full">
                                Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                        >
                            <Link href={route('logout')} method="post" className="block w-full h-full">
                                Logout.
                            </Link>
                        </Menu.Item>
                    </Menu.Dropdown>*/}
                    <Menu.Dropdown>
                        <Menu.Label>{user.firstname} {user.lastname}</Menu.Label>
                        <Menu.Item>
                            <Link href={route('profile.edit')} className="block w-full h-full">
                                Profile
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href={route('password.change')} className="block w-full h-full">
                                Password
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href={route('two-factor.auth')} className="block w-full h-full">
                                2FA
                            </Link>
                        </Menu.Item>

                        <Menu.Divider/>

                        <Menu.Item
                            color="red">
                            <Link href={route('destroy.view')} className="block w-full h-full">
                                Delete my account
                            </Link>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item color="red">
                            <Link href={route('logout')} method="post" as="button"
                                  className="block w-full h-full text-start">Logout</Link>
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </>
    );
};
