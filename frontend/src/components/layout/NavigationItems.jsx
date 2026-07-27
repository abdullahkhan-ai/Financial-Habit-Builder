import { NavLink } from "react-router-dom";

function NavigationItems({
  menuItems,
  collapsed = false,
  mobile = false,
  onNavigate,
}) {
  return (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (mobile && onNavigate) {
                onNavigate();
              }
            }}
            className={({ isActive }) =>
              `group relative flex items-center rounded-2xl transition-all duration-300 ${
                collapsed
                  ? "justify-center px-0 py-3"
                  : "gap-4 px-4 py-3"
              } ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-900"
                  }`}
                />

                {!collapsed && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}

                {collapsed && !mobile && (
                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-full
                      top-1/2
                      ml-3
                      -translate-y-1/2
                      whitespace-nowrap
                      rounded-xl
                      bg-slate-900
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-white
                      opacity-0
                      shadow-xl
                      transition-all
                      duration-200
                      group-hover:opacity-100
                    "
                  >
                    {item.name}
                  </span>
                )}
                              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavigationItems;