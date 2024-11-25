import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Button, PasswordInput} from '@mantine/core';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler, useRef} from 'react';
import {useDisclosure} from '@mantine/hooks';
import {useNotification} from "@/Context/NotificationContext";

export default function UpdatePasswordForm({
                                               className = '',
                                           }: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [loading, {open, close}] = useDisclosure();
    const {triggerNotification} = useNotification();
    const {
        data,
        setData,
        errors,
        put,
        reset,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        open();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                triggerNotification('Success', 'Your password has been updated successfully!', 'green');
                close();
            },
            onError: (errors) => {
                reset('password', 'password_confirmation');
                currentPasswordInput.current?.focus();

                if (!errors.current_password && !errors.password) {
                    triggerNotification('Warning', 'Update failed, please try again!', 'yellow');
                }
                close();

            },
            onFinish: () => {
                reset();
                close();
            }
        });

    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile"/>
            <div className="flex justify-center">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Update Password
                        </h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Ensure your account is using a long, random password to stay
                            secure.
                        </p>
                    </header>

                    <form onSubmit={updatePassword} className="mt-6 space-y-6">
                        <PasswordInput
                            mt="md"
                            label="Current Password"
                            placeholder="Current Password"
                            error={errors.current_password}
                            ref={currentPasswordInput}
                            withAsterisk
                            inputWrapperOrder={['label', 'input', 'error']}
                            name="current_password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                        />

                        <PasswordInput
                            mt="md"
                            label="Password"
                            placeholder="Password"
                            ref={passwordInput}
                            error={errors.password}
                            withAsterisk
                            inputWrapperOrder={['label', 'input', 'error']}
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <PasswordInput
                            mt="md"
                            label="Password Confirmation"
                            placeholder="Password Confirmation"
                            error={errors.password_confirmation}
                            withAsterisk
                            inputWrapperOrder={['label', 'input', 'error']}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />

                        <div className="flex items-center gap-4">
                            <Button
                                type="submit"
                                fullWidth
                                variant="filled"
                                color="rgba(0, 0, 0, 1)"
                                loading={loading}
                                loaderProps={{type: 'dots'}}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
