// import dependencies
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../src/redux/userSlice";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckLogin } from "./utils/checklogin";
import "./App.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChakraProvider, Img } from "@chakra-ui/react";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "../src/components/loginForm";
import { RegistrationForm } from "../src/components/registerForm";
import { ResetPassword } from "./pages/reset";
import { ConfirmEmail } from "./pages/confirmemail";
import Verification from "../src/pages/verification";
import theme from "../src/theme/theme";
import Dashboard from "./components/adminLayouts/Admin";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StoreProductDetail from "./components/store/product/productDetail";
import ShoppingCart from "./pages/user/shoppingCart";
import UserProduct from "./pages/user/product";
import UserProfile from "./pages/user/profile/user";
import CheckOut from "./pages/user/checkOut";
import UserTransaction from "./pages/user/transaction";
import { Loading } from "./components/loading";
import { ChangePassword } from "./pages/user/profile/changepass";
import ModalPrescription from "./pages/user/prescription/prescriptionpage";
import { apiRequest } from "./helper/api";

function App() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  let keepLogin = async () => {
    let response = await CheckLogin();
    console.log("responsee", response);
    if (response.dataUser !== null) {
      dispatch(login(response.dataUser));
      localStorage.setItem("user", JSON.stringify(response.tokenUser));
    }
    //   // setisLoading(false);
  };
  useEffect(() => {
    // setisLoading(true);
    // const userLogin = JSON.parse(localStorage.getItem("user"));
    // if (userLogin) {
    //   dispatch(login(userLogin));
    // }
    const token = JSON.parse(localStorage.getItem("user"));
    setTimeout(() => {setIsLoading(false)}, 5000);
    const fetchUser = async (token) => {
      try {
        const result = await apiRequest.get(`/auth/auth`, {headers: {Authorization : `Bearer ${token}`}});
        dispatch(login({...result.data.data}));} catch (error) {localStorage.removeItem("user");}};
    if (token) {fetchUser(token);}
    // setTimeout(() => {
    //   setisLoading(false);
    // }, 3000);
    // fetchUser(token);
    // keepLogin();
  }, []);

  return (
    <>
    {isLoading ? (<Loading/>) :
    (
    <ChakraProvider theme={theme} resetCss={false} position="relative">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomePage />}
          errorElement={<ErrorPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route
          path="*"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/store/product" element={<UserProduct />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/prescription" element={<ModalPrescription />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/store/product/detail/:id" element={<StoreProductDetail />}/>
        <Route path="/myaccount" Component={UserProfile} />
        <Route></Route>
        <Route path="/mytransaction" element={<UserTransaction />} />
        <Route path="/mytransaction/checkout" element={<CheckOut />} />
        <Route
          path="/mytransaction/waiting-payment"
          element={<UserTransaction />}
        />
        <Route
          path="/mytransaction/waiting-confirmation"
          element={<UserTransaction />}
        />
        <Route path="/mytransaction/received" element={<UserTransaction />} />
        <Route path="/mytransaction/payment" element={<UserTransaction />} />
        <Route
          path="/mytransaction/on-the-way"
          element={<UserTransaction />}
        />
        <Route
          path="/mytransaction/on-process"
          element={<UserTransaction />}
        />
        <Route
          path="/mytransaction/cancelled"
          element={<UserTransaction />}
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
    )
  }
  </>
  );
}

export default App;
