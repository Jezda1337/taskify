import Image from "next/future/image";
import React, { useEffect } from "react";
import { UserProfile } from "types/auth/user-profile.type";
import { Button, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { Stack } from "@mui/system";

type ProfileInfoProps = {
  profile: UserProfile;
  user: UserProfile;
};
const ProfileInfo = ({
  profile: { _id, fullname, email, avatar },
  user,
}: ProfileInfoProps) => {
  const [isMyProfile, setIsMyProfile] = React.useState(user._id === _id);

  useEffect(() => {
    setIsMyProfile(user._id === _id);
  }, [user._id, _id]);

  return (
    <Stack className="fade-in sticky top-[80px] m-auto gap-6 justify-center items-center flex-col max-w-[300px]">
      <Image
        src={avatar}
        alt={fullname}
        width={220}
        height={220}
        priority
        className="rounded-full shadow-md"
      />

      <Typography variant="h4">{fullname}</Typography>

      <Stack direction="row" gap={1}>
        <EmailOutlinedIcon /> {email}
      </Stack>

      {isMyProfile ? (
        <Button
          variant="outlined"
          fullWidth
          color="inherit"
          startIcon={<SettingsOutlinedIcon />}
        >
          Edit profile
        </Button>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          color="inherit"
          startIcon={<PersonAddAlt1OutlinedIcon />}
        >
          Work together
        </Button>
      )}
    </Stack>
  );
};

export default ProfileInfo;
