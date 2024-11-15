import {Button, PasswordInput} from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {useDisclosure} from '@mantine/hooks';

export default function ResetPassword({
                                          token,
                                          email,
                                      }: {
    token: string;
    email: string;
}) {
    const {data, setData, post, errors, reset} = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [loading, {open, close}] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        post(route('password.store'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
                close();
            },
            onError: () => {
                close();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password"/>

            <form onSubmit={submit}>
                <PasswordInput
                    mt="md"
                    label="Password"
                    placeholder="Password"
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

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        type="submit"
                        fullWidth
                        variant="filled"
                        color="rgba(0, 0, 0, 1)"
                        loading={loading}
                        loaderProps={{type: 'dots'}}
                    >
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
