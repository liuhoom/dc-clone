interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

interface MainNavItem extends NavItem {}

interface SidebarNavItem extends NavItemWithChildren {}

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  chartsNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Accordion',
          href: '/docs/components/accordion',
          items: [],
        },
      ],
    },
  ],
  chartsNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/charts',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/charts/installation',
          items: [],
        },
        {
          title: 'Theming',
          href: '/docs/charts/theming',
          items: [],
        },
      ],
    },
    {
      title: 'Charts',
      items: [
        {
          title: 'Area Chart',
          href: '/docs/charts/area',
          items: [],
        },
        {
          title: 'Bar Chart',
          href: '/docs/charts/bar',
          items: [],
        },
        {
          title: 'Line Chart',
          href: '/docs/charts/line',
          items: [],
        },
        {
          title: 'Pie Chart',
          href: '/docs/charts/pie',
          items: [],
        },
        {
          title: 'Radar Chart',
          href: '/docs/charts/radar',
          items: [],
        },
        {
          title: 'Radial Chart',
          href: '/docs/charts/radial',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Tooltip',
          href: '/docs/charts/tooltip',
          items: [],
        },
        {
          title: 'Legend',
          href: '/docs/charts/legend',
          items: [],
        },
      ],
    },
  ],
}
