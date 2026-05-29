declare namespace JSX {
  interface IntrinsicElements {
    'phantom-ui': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      loading?: string | boolean;
    };
  }
}