import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserLayout from "./pages/User/UserLayout";
import AdminHome from "./pages/Admin/AdminHome";
import User from "./pages/Admin/User";
import AdminTasks from "./pages/Admin/AdminTasks";
import UpdateUser from "./pages/Admin/UpdateUser";
import CreateUser from "./pages/Admin/CreateUser";
import CreateTask from "./pages/Admin/CreateTask";
import UpdateTask from "./pages/Admin/UpdateTask";
// import UserProfile from "./pages/User/UserProfile";
import UserTask from "./pages/User/UserTask";
import UserHome from "./pages/User/UserHome";
import Comment from "./pages/Admin/Comment";
import UserComment from "./pages/User/UserComment";
import UserProfile from "./pages/User/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />

        {/**Admin */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="users" element={<User />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="update-user/:id" element={<UpdateUser />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="update-task/:id" element={<UpdateTask />} />
          <Route path="comment/:taskId" element={<Comment />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="tasks" element={<UserTask />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="comment/:taskId" element={<UserComment />} />
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
