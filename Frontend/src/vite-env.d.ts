/// <reference types="vite/client" />

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'phantom-ui': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        loading?: string | boolean;
      };
    }
  }
}