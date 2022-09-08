import "../src/index.css";

// Registrar el addon msw
import { initialize, mswDecorator } from "msw-storybook-addon";

// Inicializar msw
initialize();

// Proveer el addon decorador MSW globalmente
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
