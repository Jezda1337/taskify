import React, { useEffect } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel, { a11yPropsTabs } from "@/components/shared/TabPanel";
import { useMediaQuery, useTheme } from "@mui/material";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { UserTabs } from "enums/user-tabs.enum";
import { useRouter } from "next/router";
import { getTabValue } from "utils/helpers";

const userTabs = [
  {
    label: "Overview",
    icon: <AssignmentIndOutlinedIcon />,
  },
  {
    label: "Settings",
    icon: <TuneOutlinedIcon />,
  },
];

const UserDetailTabs = () => {
  const router = useRouter();
  const selectedTab: UserTabs = getTabValue(Number(router.query.tab), UserTabs);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push({ query: { ...router.query, tab: newValue } });
  };

  return (
    <>
      <Box
        className={`fade-in grow sticky z-[1] bg-background z-1`}
        style={{ top: isSmallScreen ? 56 : 64 }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="User tabs"
          variant="scrollable"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
          scrollButtons={isSmallScreen ? false : "auto"}
        >
          {userTabs.map((tab, index) => (
            <Tab
              className="min-h-[unset]"
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              key={tab.label}
              {...a11yPropsTabs(index)}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel selectedIndex={selectedTab} index={UserTabs.OVERVIEW}>
        <h2 className="fade-in">Overview component</h2>
      </TabPanel>
      <TabPanel selectedIndex={selectedTab} index={UserTabs.SETTINGS}>
        <h2 className="fade-in">Settings component</h2>
      </TabPanel>
    </>
  );
};

export default UserDetailTabs;
