import { EffectiveSelector } from './EffectiveSelector';
import { DateType, IdType } from '../api/Api';

export interface Code {
    id?: IdType; // TODO: This has to be optional for now
    code?: IdType; // TODO: This has to be optional for now
    locationId?: IdType;
    description?: string;
    expiryDate?: DateType;
}

// This was the previous default function for sorting codes, which sorts by description
// It's not suitable for the revised code types implementation (JIRA SS_15, SS-71)
export const defaultSortByDescription = <P>(a: any, b: any): number  => {
    return (a.get) ? a.description.localeCompare(b.description) : -1;
};

export const defaultSortByCode = <P>(a: any, b: any): number => {
    return (a.code < b.code) ? -1 : (a.code > b.code) ? 1 : 0;
};

export const defaultSortBySortOrder = <P>(a: any, b: any): number => {
    return (a.sortOrder < b.sortOrder) ? -1 : (a.sortOrder > b.sortOrder) ? 1 : 0;
};

// This is the new code type sorting function for the revised code types implementation (JIRA SS_15, SS-71)
export const customSortByLocationIsNull = (customSortFn: <P>(a: any, b: any) => number) =>
    <P>(a: any, b: any): number => {

    let aHasLocation = !(a.locationId === null || a.locationId === '');
    let bHasLocation = !(b.locationId === null || b.locationId === '');

    // If 'a' and 'b' BOTH have no location set, or if 'a' and 'b' BOTH have a location set...
    if ((!aHasLocation && !bHasLocation) || (aHasLocation && bHasLocation)) {
        // Just compare by their code value
        return customSortFn(a, b);
    }

    return (!aHasLocation && bHasLocation) ? -1 : (aHasLocation && !bHasLocation) ? 1 : 0;
};

export const customSortByFields = (fields: string[]) => {
    return (a: any, b: any) => {
        // tslint:disable-next-line:forin
        for (let x in fields) {
            let ax = a[fields[x].substring(1)];
            let bx = b[fields[x].substring(1)];
            let cx;

            ax = typeof ax === 'string' ? ax.toLowerCase() : ax / 1;
            bx = typeof bx === 'string' ? bx.toLowerCase() : bx / 1;

            if (fields[x].substring(0, 1) === '-') { cx = ax; ax = bx; bx = cx; }
            if (ax !== bx) {
                return ax < bx ? -1 : 1;
            }
        }

        return -1;
    };
};

// Use this for default sort operations on codes (JIRA SS_15, SS-71)
export class CodeSelector<P extends Code> extends EffectiveSelector<P> {
    constructor(
        mapSelector: ((state: any) => { [key: string]: P }),
        // Sort by code
        // sort: ((a: P, b: P) => number) = customSortByLocationIsNull(defaultSortByCode) // Curry this
        // Sort by sort order
        // sort: ((a: P, b: P) => number) = customSortByFields(['-locationId', '+sortOrder']) // Curry this
        // Sort by sort order
        sort: ((a: P, b: P) => number) = customSortByLocationIsNull(defaultSortBySortOrder) // Curry this
    ) {
        super(mapSelector, (c) => c.expiryDate, sort);
    }
}

// Use this for custom sort operations on codes (JIRA SS_15, SS-71)
// Supply a custom sort function when instantiating this class
export class CustomCodeSelector<P extends Code> extends EffectiveSelector<P> {
    constructor(
        mapSelector: ((state: any) => { [key: string]: P }),
        sort: ((a: P, b: P) => number)
    ) {
        super(mapSelector, (c) => c.expiryDate, sort);
    }
}
