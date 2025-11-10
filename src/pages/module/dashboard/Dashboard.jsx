import { Building2, Utensils, Users, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../../components/uiComponent/LoaderSpinner";
import PagePath2 from "../../../components/uiComponent/PagePath2";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="min-h-screen flex flex-col w-full">
        <div className="bg-white p-4 mb-4 rounded-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100/50">
              <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Dashboard
            </h1>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
