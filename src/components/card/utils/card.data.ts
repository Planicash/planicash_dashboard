import { CreditCard, DollarSign, Package, Users } from "lucide-preact";
import type { DashboardCard } from "./card";

export const dashboardCardsData: DashboardCard[] = [
    {
        title: "Total Products",
        value: "25,154",
        percentage: 25,
        icon: Package,
    },
    {
        title: "Total Paid Orders",
        value: "$16,000",
        percentage: 12,
        icon: DollarSign,
    },
    {
        title: "Total Customers",
        value: "15,400k",
        percentage: 15,
        icon: Users,
    },
    {
        title: "Sales",
        value: "12,340",
        percentage: 19,
        icon: CreditCard,
    },
];
