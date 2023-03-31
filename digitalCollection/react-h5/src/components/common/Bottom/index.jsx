import { TabBar } from "antd-mobile";
import IconFont from "../IconFont";
import { tabs } from "../../../constant/tab_config";
import { useNavigate, useLocation } from "react-router-dom";

const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const setRouteActive = value => {
    navigate(value);
  };

  return (
    <TabBar
      activeKey={pathname}
      onChange={value => {
        setRouteActive(value);
      }}
    >
      {tabs.map(item => (
        <TabBar.Item
          key={item.key}
          icon={
            <IconFont
              type={pathname === item.key ? item.activeIcon : item.icon}
            />
          }
          title={item.title}
        />
      ))}
    </TabBar>
  );
};

export default Bottom;
