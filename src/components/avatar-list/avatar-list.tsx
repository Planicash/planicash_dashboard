import type { FunctionalComponent } from "preact";
import type { AvatarListProps } from "./utils/avatar-list";

const AvatarList: FunctionalComponent<AvatarListProps> = ({  items }) => {
  return (
    <div className="card-body h-[300px] overflow-auto p-0">  {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-x-4 py-2 pr-2"
          >
            <div className="flex items-center gap-x-4">
              <img
                src={item.image}
                alt={item.title}
               className="size-10 flex-shrink-0 rounded-full object-cover"
              />
              <div className="flex flex-col gap-y-1">
               <p className="font-medium text-slate-900 dark:text-slate-50">{item.title}</p>
                {item.subtitle &&     <p className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</p>}
              </div>
            </div>
            {item.value !== undefined && (
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
  );
};

export default AvatarList;
