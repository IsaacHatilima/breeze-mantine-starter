import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Button, PasswordInput, PinInput} from '@mantine/core';
import {Head, router, useForm, usePage} from '@inertiajs/react';
import {useDisclosure} from '@mantine/hooks';
import {useNotification} from "@/Context/NotificationContext";
import axios from 'axios';
import React, {FormEventHandler, useEffect, useState} from "react";
import Modal from "@/Components/Modal";


export default function TwoFactor({}: { className?: string; }) {
    const user = usePage().props.auth.user;

    const [loading, {open, close}] = useDisclosure();
    const {triggerNotification} = useNotification();
    const [activateTwoFactorModal, setActivateTwoFactorModal] = useState(false);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const activatingTwoFactorModal = () => {
        setActivateTwoFactorModal(true);
    };

    const deactivateTwoFactorModal = () => {
        setActivateTwoFactorModal(true);
    };

    const [errors, setErrors] = useState<{ password?: string }>({});

    const {reset, clearErrors, data, setData} = useForm({
        code: '',
        password: ''
    });


    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setActivateTwoFactorModal(false);
        clearErrors();
        reset();
    };


    function refreshUser() {
        router.get(route('two-factor.auth'), {}, {
            preserveScroll: true,
        });
    }

    useEffect(() => {
        if (user.two_factor_secret && !user.copied_codes) {
            handleGetTwoFactorQRCode();
            handleGetTwoFactorRecoveryCodes();
        }
    }, []);

    // Confirm Password
    const handleConfirmUserPassword: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        if (data.password !== '') {
            axios.post('/user/confirm-password', {'password': data.password})
                .then(response => {
                    handleActivateTwoFactor();
                })
                .catch(error => {
                    setErrors({password: 'Invalid Password.'});
                });
        } else {
            setErrors({password: 'Password is required.'});
        }
        close();
    };

    // Activate 2FA
    const handleActivateTwoFactor = () => {
        open();
        axios.post('/user/two-factor-authentication')
            .then(response => {
                refreshUser();
                handleGetTwoFactorQRCode();
                triggerNotification('Success', '2FA has been enabled.', 'green');
                close();
            })
            .catch(error => {
                triggerNotification('Warning', 'Unable to enable 2FA.', 'yellow');
                close();
            });
    }

    // Disable 2FA
    const handleDeactivateTwoFA: FormEventHandler = (e) => {
        e.preventDefault();
        open();

        if (data.password !== '') {
            axios.post('/user/confirm-password', {'password': data.password})
                .then(response => {
                    deactivateTwoFA();
                })
                .catch(error => {
                    setErrors({password: 'Invalid Password.'});
                });
        } else {
            setErrors({password: 'Password is required.'});
        }
    }

    const deactivateTwoFA = () => {
        axios.delete('/user/two-factor-authentication')
            .then(response => {
                console.log('hereee');
                handleClearConfirmedAt();
                refreshUser();
                triggerNotification('Success', '2FA has been disabled.', 'green');
                close();
            })
            .catch(error => {
                triggerNotification('Warning', 'Unable to disable 2FA.', 'yellow');
                close();
            });
    }

    // Clear 2FA Confirmed At
    const handleClearConfirmedAt = () => {
        axios.patch(route('clear.2fa.confirmation'))
            .then(response => {

            })
            .catch(error => {

            });
    }

    // Get 2FA QR Code
    const handleGetTwoFactorQRCode = () => {
        axios.get('/user/two-factor-qr-code')
            .then(response => {
                setQrCodeSvg(response.data.svg);
            });
    }

    // Get 2FA Recovery Codes
    const handleGetTwoFactorRecoveryCodes = () => {
        axios.get('/user/two-factor-recovery-codes')
            .then(response => {
                setRecoveryCodes(response.data); // Update the ref's value
            });
    }

    // Verify 2FA Code
    const handleCodeSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        try {
            // Make POST request to the server
            axios.post('/user/confirmed-two-factor-authentication', {'code': data.code})
                .then(response => {
                    refreshUser()
                    handleGetTwoFactorRecoveryCodes();
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

    const handleCopiedCodes = () => {
        axios.put(route('copy.2fa.codes'))
            .then(response => {
                refreshUser();
                triggerNotification('Success', '2FA recovery codes copied.', 'green');
            })
            .catch(error => {
                triggerNotification('Warning', 'Unable to copy 2FA recovery codes.', 'yellow');
            });
    }
    const handleDownloadCodes = () => {
        open();

        // @ts-ignore
        const blob = new Blob([recoveryCodes.join('\n')], {type: 'text/plain'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'recoveryCodes.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        handleCopiedCodes();

        close();
    };


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

                    {recoveryCodes && user.two_factor_confirmed_at && !user.copied_codes && (
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
                        <div className="flex items-center gap-4 mt-4">
                            <Modal show={activateTwoFactorModal} onClose={closeModal} maxWidth={"sm"}>
                                <div className="px-4">
                                    <form onSubmit={handleDeactivateTwoFA}>
                                        <PasswordInput
                                            mt="xl"
                                            label="Password"
                                            placeholder="Password"
                                            error={errors.password}
                                            withAsterisk
                                            inputWrapperOrder={['label', 'input', 'error']}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            autoFocus={true}
                                        />


                                        <div className="flex items-center gap-4 my-4">
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
                                </div>
                            </Modal>
                            <Button
                                type="button"
                                fullWidth
                                variant="filled"
                                color="red"
                                loading={loading}
                                loaderProps={{type: 'dots'}}
                                onClick={activatingTwoFactorModal}
                            >
                                Deactivate 2FA
                            </Button>
                            {!user.copied_codes && (
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="filled"
                                    loading={loading}
                                    loaderProps={{type: 'dots'}}
                                    onClick={handleDownloadCodes}
                                >
                                    Copy Codes
                                </Button>
                            )}

                        </div>
                    ) : user.two_factor_secret && user.two_factor_recovery_codes ? (
                        <div>
                            <div className="flex flex-row items-center justify-between gap-4">
                                <form onSubmit={handleDeactivateTwoFA}>
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
                                <form onSubmit={handleCodeSubmit}
                                      className="mt-6 flex items-center justify-center flex-col">
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
                        <div className="flex items-center gap-4 mt-2">
                            <Button
                                type="button"
                                fullWidth
                                variant="filled"
                                color="rgba(0, 0, 0, 1)"
                                onClick={activatingTwoFactorModal}
                            >
                                Active 2FA
                            </Button>
                            <Modal show={activateTwoFactorModal} onClose={closeModal} maxWidth={"sm"}>
                                <div className="px-4">
                                    <form onSubmit={handleConfirmUserPassword}>
                                        <PasswordInput
                                            mt="xl"
                                            label="Password"
                                            placeholder="Password"
                                            error={errors.password}
                                            withAsterisk
                                            inputWrapperOrder={['label', 'input', 'error']}
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            autoFocus={true}
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
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
