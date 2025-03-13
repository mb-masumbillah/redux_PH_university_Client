import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Drawer, Button } from "antd";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { adminSlidebarItems } from "../../routes/Admin.route";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ Window Resize Handle (Responsive)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Sidebar Menu Items (icon removed)

  // const items: MenuProps["items"] = [
  //   {
  //     key: "Dashboard",
  //     label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
  //   },
  //   {
  //     key: "User Management",
  //     label: "User Management",
  //     children: [
  //       {
  //         key: "Create Admin",
  //         label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
  //       },
  //       {
  //         key: "Create Faculty",
  //         label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
  //       },
  //       {
  //         key: "Create Student",
  //         label: <NavLink to="/admin/create-student">Create Student</NavLink>,
  //       },
  //     ],
  //   },
  //   {
  //     key: "3",
  //     label: "Settings",
  //     children: [
  //       {
  //         key: "3-1",
  //         label: "Account",
  //       },
  //       {
  //         key: "3-2",
  //         label: "Security",
  //       },
  //     ],
  //   },
  // ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="md"
          onBreakpoint={(broken) => setCollapsed(broken)}
        >
          {/* ✅ Logo Bar */}
          <div
            style={{
              height: 50,
              background: "#001529",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {collapsed ? "My" : "My Logo"}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={adminSlidebarItems}
          />
        </Sider>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          styles={{ body: { padding: 0 } }}
          width="50%"
        >
          {/* ✅ Logo + Close Icon */}
          <div
            style={{
              height: 50,
              background: "#001529",
              color: "#fff",
              textAlign: "center",
              lineHeight: "50px",
              fontSize: "18px",
              fontWeight: "bold",
              position: "relative",
            }}
          >
            My Logo
            <CloseOutlined
              style={{
                position: "absolute",
                right: 15,
                top: 15,
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={() => setMobileOpen(false)}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={adminSlidebarItems}
          />
        </Drawer>
      )}

      {/* Main Layout */}
      <Layout>
        {/* ✅ Header Bar */}
        <Header
          style={{
            background: "#001529",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {isMobile ? (
            <Button
              type="text"
              icon={
                <MenuUnfoldOutlined
                  style={{ fontSize: "18px", color: "#fff" }}
                />
              }
              onClick={() => setMobileOpen(true)}
            />
          ) : collapsed ? (
            <MenuUnfoldOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "#fff" }}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "#fff" }}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
