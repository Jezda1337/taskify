import React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@/components/shared/TabPanel";
import { useMediaQuery, useTheme } from "@mui/material";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { ProfileTabs } from "enums/profile-tabs.enum";
import { useRouter } from "next/router";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const tabs = [
  {
    label: "Overview",
    icon: <AssignmentIndOutlinedIcon />,
  },
  {
    label: "Teammates",
    icon: <EngineeringOutlinedIcon />,
  },
  {
    label: "Projects",
    icon: <AssignmentOutlinedIcon />,
  },
];

const ProfileDetailTabs = () => {
  const router = useRouter();
  const selectedTab: ProfileTabs = Number(router.query.tab) || 0;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push({ query: { ...router.query, tab: newValue } });
  };

  return (
    <>
      <Box className={`fade-in grow sticky top-[${isSmallScreen ? 56 : 64}px] z-[1] bg-background z-1`} >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="Profile tabs"
          variant="scrollable"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
          scrollButtons={isSmallScreen ? false : "auto"}
        >
          {tabs.map((tab, index) => (
            <Tab
              className="min-h-[unset]"
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              key={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel selectedIndex={selectedTab} index={ProfileTabs.OVERVIEW}>
        <h2 className="fade-in">Overview component</h2>
      </TabPanel>
      <TabPanel selectedIndex={selectedTab} index={ProfileTabs.TEAM_MATES}>
        <h2 className="fade-in">Teammates component</h2>
      </TabPanel>
      <TabPanel selectedIndex={selectedTab} index={ProfileTabs.PROJECTS}>
        <h2 className="fade-in">Projects component</h2>
      </TabPanel>
    </>
  );
};

export default ProfileDetailTabs;
