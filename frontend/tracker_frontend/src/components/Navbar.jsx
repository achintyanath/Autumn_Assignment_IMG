import React from "react";
import { render } from "react-dom";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});
const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

const NavBarMobile = (props) => {
  const {
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
  } = props;

  return (

        <Menu fixed="top" inverted>
          <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {rightItems.map((item) => (
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
        </Menu>


  );
};

const NavBarDesktop = (props) => {
  const { leftItems, rightItems } = props;

  return (
    <Menu fixed="top" inverted>
      <Menu.Item>
        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>

      {leftItems.map((item) => (
        <Menu.Item {...item} />
      ))}

      <Menu.Menu position="right">
        {rightItems.map((item) => (
          <Menu.Item {...item} />
        ))}
      </Menu.Menu>
    </Menu>
  );
};

const NavBarChildren = (props) => (
  <Container style={{ marginTop: "5em" }}>{props.children}</Container>
);

class NavBar extends React.Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Media at="mobile">
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Media>

        <Media greaterThan="mobile">
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Media>
      </div>
    );
  }
}

const leftItems = [
  { as: "a", content: "Home", key: "home" },
  { as: "a", content: "Users", key: "users" }
];
const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];

const App = () => (
  <>
    <style>{mediaStyles}</style>

    <MediaContextProvider>
      <NavBar leftItems={leftItems} rightItems={rightItems}>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </NavBar>
    </MediaContextProvider>
  </>
);

render(<App />, document.getElementById("root"));
