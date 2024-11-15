import {Button, TextInput} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Link, useForm, usePage} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {useNotification} from "@/Context/NotificationContext";

export default function UpdateProfileInformation({
                                                     mustVerifyEmail,
                                                     status,
                                                     className = '',
                                                 }: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const {data, setData, patch, errors, recentlySuccessful} =
        useForm({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });

    const [loading, {open, close}] = useDisclosure();
    const {triggerNotification} = useNotification();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        open();
        patch(route('profile.update'), {
            onFinish: () => {
                close();
                triggerNotification();
            },
            onError: () => {
                close();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <TextInput
                    inputWrapperOrder={['label', 'input', 'error']}
                    mt="md"
                    type="text"
                    label="First Name"
                    placeholder="Jack"
                    error={errors.firstname}
                    withAsterisk
                    name="firstname"
                    autoComplete="firstname"
                    value={data.firstname}
                    onChange={(e) => setData('firstname', e.target.value)}
                    autoFocus={true}
                />

                <TextInput
                    inputWrapperOrder={['label', 'input', 'error']}
                    mt="md"
                    type="text"
                    label="Last Name"
                    placeholder="Doe"
                    error={errors.lastname}
                    withAsterisk
                    name="lastname"
                    autoComplete="lastname"
                    value={data.lastname}
                    onChange={(e) => setData('lastname', e.target.value)}
                />

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
                />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
        </section>
    );
}
