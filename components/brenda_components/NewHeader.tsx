'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {
    Avatar,
    Box,
    Center,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    VStack
} from "@chakra-ui/react";
import {FiChevronDown, FiInbox, FiLogOut, FiSettings} from "react-icons/fi";
import {CgProfile} from "react-icons/cg";
import {signOut, useSession} from "next-auth/react";

function NewHeader() {
    const session = useSession();
    if (!session.data) return <></>
    return (
        <header className="border-b">
            <nav className="container mx-auto py-3 px-3 flex justify-between">
                <div className={"ml-20"}>
                    <Link href={"/"}>
                        <Image
                            src="/bespace/bespace-v3.png"
                            width={170}
                            height={50}
                            alt="logo"
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
                <div className={"mr-20"}>
                    <Menu>
                        <MenuButton

                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={
                                        session.data.user.image
                                            ? session.data.user.image
                                            : "https://avatars.dicebear.com/api/male/username.svg"
                                    }
                                />
                            </HStack>
                        </MenuButton>
                        <MenuList zIndex={9999} alignItems={"center"} className="text-sm">
                            <br />
                            <Center>
                                <Avatar
                                    size={"lg"}
                                    src={
                                        session.data.user.image
                                            ? session.data.user.image
                                            : "https://avatars.dicebear.com/api/male/username.svg"
                                    }
                                />
                            </Center>
                            <br />
                            {(session.data.user.name || session.data.user.last_name) && (
                                <Center>
                                    <p>{session.data.user.name}{" "}{session.data.user.last_name != null && session.data.user.last_name}</p>
                                </Center>
                            )}

                            {session.data.user.email && (
                                <Center className="mt-1 text-xs font-extralight px-4">
                                    <p>{session.data.user.email}</p>
                                </Center>
                            )}

                            <br />
                            <MenuDivider />
                            <MenuItem as={Link} href={"/profile"} icon={<CgProfile />}>
                                Профиль
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem icon={<FiInbox />}>
                                {session.data.user.role === "CLIENT"
                                    ? "Ваши заказы"
                                    : "Активные проекты"}
                            </MenuItem>
                            <MenuItem icon={<FiSettings />}>Настройки профиля</MenuItem>
                            <MenuDivider />
                            <MenuItem icon={<FiLogOut />} onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default NewHeader;