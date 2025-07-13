export type NavLinkItem = {
    label: string;
    path: string;
    icon: React.ElementType;
};

export type NavGroup = {
    title: string;
    links: NavLinkItem[];
};

export type OverviewItem = {
    name: string;
    total: number;
};
export type RecentSale = {
    id: number;
    name: string;
    email: string;
    image: string;
    total: number;
};
export type Column<T> = {
    key: keyof T;
    label: string;
    render?: (item: T) => JSX.Element | string | number;
    className?: string;
};

export type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey: keyof T;
    title?: string;
};
