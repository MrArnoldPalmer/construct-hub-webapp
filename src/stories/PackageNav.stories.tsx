import { MemoryRouter } from "react-router-dom";
import { Story } from "@storybook/react";
import { PackageNav, PackageNavProps } from "../PackageNav";

export default {
  title: "Package Navigation",
  component: PackageNav,
  decorators: [
    (ComponentStory: any) => (
      <MemoryRouter>
        <ComponentStory />
      </MemoryRouter>
    ),
  ],
};

const Template: Story<PackageNavProps> = (props) => <PackageNav {...props} />;

/* function makeTestItems( */
/*   length: number, */
/*   level: number, */
/*   currentLevel: number = 1 */
/* ): NavItem[] { */
/*   return [...Array(length)].map((_, i) => ({ */
/*     title: `item${currentLevel}-${i + 1}`, */
/*     path: `#${currentLevel}-${i + 1}`, */
/*     children: */
/*       currentLevel === level */
/*         ? [] */
/*         : makeTestItems(length, level, currentLevel + 1), */
/*   })); */
/* } */

export const Primary = Template.bind({});
Primary.args = {
  items: [],
  /* items: makeTestItems(3, 2), */
};

/* export const Active = Template.bind({ */
/*   decorators: [ */
/*     (ComponentStory: any) => ( */
/*       <MemoryRouter */
/*         initialEntries={[ */
/*           { */
/*             hash: "#1-1", */
/*           }, */
/*         ]} */
/*       > */
/*         <ComponentStory /> */
/*       </MemoryRouter> */
/*     ), */
/*   ], */
/* }); */

/* Active.args = { */
/*   items: makeTestItems(3, 2), */
/* }; */
