import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {Alert, Button, PasswordInput, TextInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';

export default function Login({status}: { status?: string }) {
    const {data, setData, post, errors, reset} = useForm({
        email: 'test@example.com',
        password: 'Password1#',
        remember: false,
    });

    const [loading, {open, close}] = useDisclosure();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        post('/login', {
            onFinish: () => {
                reset('password');
            },
            onError: () => {
                close();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && (
                <Alert variant="light" color="green" radius="md" title="Success">
                    {status}
                </Alert>
            )}

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        mt="xl"
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
                </div>

                <div className="mt-4">
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
                    />
                </div>

                <div className="mt-4 flex justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>

                    <Link
                        href={route('password.request')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                        fullWidth
                        variant="filled"
                        color="rgba(0, 0, 0, 1)"
                        loading={loading}
                        loaderProps={{type: 'dots'}}
                    >
                        Log in
                    </Button>
                </div>
                <div
                    className="mt-4 rounded-md text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                    Do not have an account? <Link href={route('register')} className=" underline ">
                    Register here.
                </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
