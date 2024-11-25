import {Config} from 'ziggy-js';

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at?: string;
    two_factor_secret?: string;
    two_factor_recovery_codes?: string;
    two_factor_confirmed_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
