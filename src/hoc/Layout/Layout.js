import { Component } from 'react';
import cls from './Layout.module.css';
import MenuToggle from '../../components/Navigations/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigations/Drawer/Drawer';

class Layout extends Component {
  state = {
    menu: false,
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };
  render() {
    return (
      <div className={cls.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenuHandler}
        />

        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
