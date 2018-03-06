import { Country } from './country';
export class Notification {
    type: string;
    country: Country;
    image: string;
    id: number;
    className: string;
    arguments: string;
    ownerGroup: number;
    partOfAlerts: boolean;
    name: string;
}
