import { Icon, PropsOf } from "@chakra-ui/react";
import type { FunctionComponent } from "react";

export const DotNetIcon: FunctionComponent<PropsOf<typeof Icon>> = (props) => {
  return (
    <Icon
      {...props}
      aria-hidden="true"
      transform="rotate(360)"
      viewBox="0 0 32 32"
    >
      <path
        d="M4.224 10.089v11.667h1.365v-8.438a12.58 12.58 0 00-.068-1.599h.052c.099.255.224.5.37.729l6 9.302h1.672V10.089h-1.359v8.203c-.016.573.016 1.146.083 1.714h-.031a13.986 13.986 0 00-.474-.781L5.995 10.09zm12.417 0v11.667h6.203l.005-1.281h-4.813v-4.047h4.214v-1.229h-4.214v-3.875h4.521V10.09zm7.25 0v1.234h3.354v10.432h1.365V11.323h3.391v-1.234zm-23.021 10a.86.86 0 00-.609.276.91.91 0 00-.26.641.901.901 0 001.542.641c.172-.167.271-.401.271-.641s-.099-.474-.271-.641a.876.876 0 00-.641-.276H.871z"
        fill="#626262"
      />
    </Icon>
  );
};
