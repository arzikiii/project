import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    other: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    other: PaletteOptions["primary"];
  }

  interface PaletteColor {
    active?: string;
    disabled?: string;
    state?: {
      hover?: string;
    };
    orange?: {
      dark?: string;
      state?: {
        active?: string;
      };
    };
    black?: {
      main?: string;
      highEmphasis?: string;
      medEmphasis?: string;
      disabled?: string;
      outline?: string;
    };
  }

  interface SimplePaletteColorOptions {
    active?: string;
    disabled?: string;
    state?: {
      hover?: string;
    };
    orange?: {
      dark?: string;
      state?: {
        active?: string;
      };
    };
    black?: {
      main?: string;
      highEmphasis?: string;
      medEmphasis?: string;
      disabled?: string;
      outline?: string;
    };
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: "#1D64E5",
    light: "#6A91FF",
    dark: "#003BB2",
    active: "#1D64E51F",
  },
  secondary: {
    main: "#D7E3F8",
    light: "#EAF0F8",
  },
  error: {
    main: "#F44336",
    light: "#F88078",
    dark: "#E31B0C",
  },
  neutral: {
    main: "#FAFAFA",
    disabled: "#00000099",
    black: {
      main: "#000000",
      highEmphasis: "rgba(0, 0, 0, 0.87)",
      medEmphasis: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
      outline: "rgba(0, 0, 0, 0.12)",
    },
    state: {
      hover: "rgba(0, 0, 0, 0.04)",
    },
  },
  other: {
    // Main hanya untuk kebutuhan type
    main: "#FFA500",
    orange: {
      dark: "#BD6F00",
      state: {
        active: "#F59E0B1F",
      },
    },
  },
};
