interface MenuInterface {
    name: string;
    vue: string;
    auth: boolean;
  }

  interface NavigationInterface {
    menuItem: MenuInterface;
  }

export default NavigationInterface;
