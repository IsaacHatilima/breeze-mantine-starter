import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Button, PinInput} from '@mantine/core';
import {Head, router, useForm, usePage} from '@inertiajs/react';
import {useDisclosure} from '@mantine/hooks';
import {useNotification} from "@/Context/NotificationContext";
import axios from 'axios';
import {useEffect, useState} from "react";
import Modal from "@/Components/Modal";


export default function UpdatePasswordForm({}: { className?: string; }) {
    const user = usePage().props.auth.user;

    const [loading, {open, close}] = useDisclosure();
    const {triggerNotification} = useNotification();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const {
        reset,
        clearErrors,
        data, setData,
    } = useForm({
        code: '',
    });
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };


    function refreshUser() {
        router.get(route('two-factor.auth'), {}, {
            preserveScroll: true,
        });
    }

    useEffect(() => {
        getTwoFactorQRCode();
        getTwoFactorRecoveryCodes();
    }, []);

    // Activate 2FA
    function activateTwoFA(e: any) {
        e.preventDefault();
        open();
        axios.post('/user/two-factor-authentication')
            .then(response => {
                refreshUser();
                getTwoFactorQRCode();
                triggerNotification('Success', '2FA has been enabled.', 'green');
                close();
            })
            .catch(error => {
                triggerNotification('Warning', 'Unable to enable 2FA.', 'yellow');
                close();
            });
    }

    // Disable 2FA
    function deactivateTwoFA(e: any) {
        e.preventDefault();
        open();
        axios.delete('/user/two-factor-authentication')
            .then(response => {
                two_factor_confirmed_at();
                refreshUser();
                triggerNotification('Success', '2FA has been disabled.', 'green');
                close();
            })
            .catch(error => {
                triggerNotification('Warning', 'Unable to disable 2FA.', 'yellow');
                close();
            });
    }

    function two_factor_confirmed_at() {
        axios.patch(route('clear.2fa.confirmation'))
            .then(response => {

            })
            .catch(error => {

            });
    }

    function getTwoFactorQRCode() {
        axios.get('/user/two-factor-qr-code')
            .then(response => {
                setQrCodeSvg(response.data.svg);
            });
    }

    function getTwoFactorRecoveryCodes() {
        axios.get('/user/two-factor-recovery-codes')
            .then(response => {
                setRecoveryCodes(response.data); // Update the ref's value
            });
    }

    function submitOTP(e: any) {
        e.preventDefault();
        open();
        try {
            // Make POST request to the server
            axios.post('/user/confirmed-two-factor-authentication', {'code': data.code})
                .then(response => {
                    refreshUser()
                    getTwoFactorRecoveryCodes();
                    triggerNotification('Success', '2FA has been confirmed.', 'green');
                })
                .catch(error => {
                    triggerNotification('Warning', 'Unable to confirm 2FA.', 'yellow');
                });
        } catch (error) {
            // Handle error
            triggerNotification('Warning', 'Unable to confirm 2FA.', 'yellow');
        } finally {
            close();
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Profile"/>
            <div className="flex justify-center">
                <div className="bg-white p-4 min-w-96 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Two Factor Authentication
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Enable 2FA for extra account security.
                        </p>
                    </header>


                    {qrCodeSvg && !user.two_factor_confirmed_at && (
                        <div
                            dangerouslySetInnerHTML={{__html: qrCodeSvg}}
                            className="qr-code flex justify-center items-center my-10"
                        />
                    )}

                    {recoveryCodes && user.two_factor_confirmed_at && (
                        <div className="flex justify-center items-center my-10">
                            <ul>
                                {recoveryCodes.map((code: string, index: any) => (
                                    <li key={index} className="mb-2">
                                        {code}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {user.two_factor_secret && user.two_factor_recovery_codes && user.two_factor_confirmed_at ? (
                        <form onSubmit={deactivateTwoFA} className="mt-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="filled"
                                    color="red"
                                    loading={loading}
                                    loaderProps={{type: 'dots'}}
                                >
                                    Deactivate 2FA
                                </Button>
                            </div>
                        </form>
                    ) : user.two_factor_secret && user.two_factor_recovery_codes ? (
                        <div>
                            <div className="flex flex-row items-center justify-between gap-4">
                                <form onSubmit={deactivateTwoFA}>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="filled"
                                            color="red"
                                            loading={loading}
                                            loaderProps={{type: 'dots'}}
                                        >
                                            Deactivate 2FA
                                        </Button>
                                    </div>
                                </form>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="filled"
                                    onClick={confirmUserDeletion}
                                >
                                    Confirm 2FA
                                </Button>
                            </div>

                            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                                <form onSubmit={submitOTP} className="mt-6 flex items-center justify-center flex-col">
                                    <h1 className="font-bold text-lg">Confirmation PIN</h1>
                                    <PinInput
                                        oneTimeCode
                                        length={6}
                                        value={data.code}
                                        onChange={(value: string) => setData('code', value)}
                                    />


                                    <div className="flex items-center gap-4 my-4">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="filled"
                                            color="rgba(0, 0, 0, 1)"
                                            loading={loading}
                                            loaderProps={{type: 'dots'}}
                                        >
                                            Active 2FA
                                        </Button>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    ) : (
                        <form onSubmit={activateTwoFA} className="mt-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="filled"
                                    color="rgba(0, 0, 0, 1)"
                                    loading={loading}
                                    loaderProps={{type: 'dots'}}
                                >
                                    Active 2FA
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
