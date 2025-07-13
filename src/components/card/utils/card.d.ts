import type { FunctionalComponent } from "preact";

export type CardProps = {
    title: string;
    value: string | number;
    percentage: string | number;
    icon?: FunctionalComponent<{ size?: number }>;
};


export type DashboardCard = {
    title: string;
    value: string | number;
    percentage: string | number;
    icon: FunctionalComponent<Any>;
};
