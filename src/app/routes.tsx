import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/app/(guest)/auth/login/page";
import RegisterPage from "@/app/(guest)/auth/register/page";
import ForgotPasswordPage from "@/app/(guest)/auth/forgot-password/page";
import ResetPasswordPage from "@/app/(guest)/auth/reset-password/page";
import VerifyOtpPage from "@/app/(guest)/auth/verify-otp/page";
import GoogleLoginSuccessPage from "@/app/(guest)/auth/login-success/page";
import DashboardPage from "@/app/(auth)/dashboard/page";
import RequireAuth from "@/components/auth/RequireAuth";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login-success" element={<GoogleLoginSuccessPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
  )
}
export default AppRoutes

