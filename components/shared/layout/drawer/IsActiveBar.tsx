import { styled, CSSObject } from "@mui/material/styles";

type IsActiveProps = { isActive: boolean; direction: "row" | "column" };

const columnMixin = (isActive: boolean): CSSObject => ({
  bottom: 0,
  width: 4,
  transform: `scaleY(${isActive ? 1 : 0})`,
});
const rowMixin = (isActive: boolean): CSSObject => ({
  right: 0,
  height: 4,
  transform: `scaleX(${isActive ? 1 : 0})`,
});

const IsActiveDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "direction",
})<IsActiveProps>(({ theme, isActive, direction }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  ...(direction === "row"
    ? { ...rowMixin(isActive) }
    : { ...columnMixin(isActive) }),
  backgroundColor: theme.palette.text.primary,
  transition: theme.transitions.create("transform", {
    easing: theme.transitions.easing.sharp,
    duration: "250ms",
  }),
}));

const IsActiveBar = ({ isActive, direction }: IsActiveProps) => {
  return <IsActiveDiv isActive={isActive} direction={direction} />;
};

export default IsActiveBar;
