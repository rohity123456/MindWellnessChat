import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FFED69",
    colorSuccess: "#43c981",
    colorTextBase: "#848484",
    colorText: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontSize: 12,
    borderRadius: 4,
    wireframe: true,
    boxShadow:
      "4px 4px 20px 0 rgba(0, 0, 0, 0.06), 4px 4px 20px 0 rgba(0, 0, 0, 0.06), 4px 4px 20px 0 rgba(0, 0, 0, 0.06)",
    boxShadowSecondary: "4px 4px 20px 0 rgba(0, 0, 0, 0.06)",
    sizeStep: 4,
    sizeUnit: 4,
    colorBgContainer: "#1F2125",
    colorBorder: "#9097A6",
  },
  components: {
    Input: {
      colorBorder: "#474747",
      colorTextPlaceholder: "#9097A6",
    },
    Button: {
      colorPrimary: "#FFED69",
      colorPrimaryHover: "#FFED69",
      colorBgContainerDisabled: "#7A7C7D",
      colorTextDisabled: "#242424",
      colorBorder: "#707785",
      colorTextLightSolid: "#242424",
    },
    Select: {
      colorBgElevated: "#1F2125",
      colorTextPlaceholder: "#9097A6",
      colorBorder: "rgba(255, 255, 255, 0.1)",
      controlItemBgActive: "rgba(255, 255, 255, 0.1)",
    },
    Dropdown: {
      colorBgElevated: "#26282c",
    },
    Drawer: {
      colorBgElevated: "#17191D",
    },
    Table: {
      colorBgContainer: "#0C0D0F",
    },
    Modal: {
      colorBgElevated: "#1E2024",
      colorBgMask: "rgba(0, 0, 0, 0.9)",
    },
    Card: {
      actionsBg: "#26282C",
      colorTextDescription: "#9097A6",
    },
    Switch: {
      colorPrimary: "#33CE70",
    },
  },
};

export default theme;
