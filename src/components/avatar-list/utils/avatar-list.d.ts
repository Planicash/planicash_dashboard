export type AvatarListItem = {
    id: string | number;
    title: string;
    subtitle?: string;
    image: string;
    value?: string | number;
};

export type AvatarListProps = {
    items: AvatarListItem[];
};
