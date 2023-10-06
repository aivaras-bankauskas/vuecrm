interface MenuInterface {
    title: string;
    name: string;
    path: string;
    vue: string;
  }

  interface NavigationInterface {
    menuItem: MenuInterface;
  }

export default NavigationInterface;
