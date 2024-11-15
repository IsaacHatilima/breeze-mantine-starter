import {Alert, Button, TextInput} from '@mantine/core';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {useDisclosure} from "@mantine/hooks";

export default function ForgotPassword({status}: { status?: string }) {
    const {data, setData, post, reset, errors} = useForm({
        email: '',
    });

    const [loading, {open, close}] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        open();
        post(route('password.email'), {
            onFinish: () => {
                reset('email');
                close();
            },
            onError: () => {
                close();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password"/>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <Alert variant="light" color="green" radius="md" title="Success">
                    {status}
                </Alert>
            )}

            <form onSubmit={submit}>
                <TextInput
                    mt="md"
                    type="email"
                    label="Email"
                    placeholder="example@mail.com"
                    error={errors.email}
                    withAsterisk
                    inputWrapperOrder={['label', 'input', 'error']}
                    name="email"
                    autoComplete="username"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    autoFocus={true}
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
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
