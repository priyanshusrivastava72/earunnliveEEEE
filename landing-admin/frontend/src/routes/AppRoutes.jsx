import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import HindiDashboardPage from "../pages/HindiDashboardPage.jsx";
import TermsPage from "../pages/TermsPage.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import RefundPage from "../pages/RefundPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LanguageSelectPage from "../pages/LanguageSelectPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/select-language"
        element={
          <ProtectedRoute>
            <LanguageSelectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard-hi"
        element={
          <ProtectedRoute>
            <HindiDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund" element={<RefundPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
