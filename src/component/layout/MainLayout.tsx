import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Drawer, Button } from "antd";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/Admin.route";
import { facultyPaths } from "../../routes/Faculty.route";
import { studentPaths } from "../../routes/Studnet.route";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, selectUser } from "../../redux/features/auth/authSlice";

const { Header, Sider, Content } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ✅ Window Resize Handle (Responsive)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login"); // ✅ Login Page এ Redirect হবে
  };

  // ✅ Login Function
  const handleLogin = () => {
    navigate("/login"); // ✅ Dashboard Page এ Redirect হবে
  };

  const user = useAppSelector(selectUser);

  let sidebarItems; 

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

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
            items={sidebarItems}
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
            items={sidebarItems}
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
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          {/* Sidebar Toggle Button */}
          <div>
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
          </div>

          {/* ✅ Login & Logout Button */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              danger
              onClick={handleLogout}
            >
              Logout
            </Button>

            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
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
