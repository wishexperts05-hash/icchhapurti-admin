import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";
import { Box } from "@mui/material";
import Button from "../../../../components/uiComponent/Button";
const AboutUS = () => {
  const navigate=useNavigate();
 const handleEdit=()=>{
       navigate("/app-management/aboutus/edit")
    }
  return (
    <Box>
            <BreadCrumb linkText={[{ text: "App Management" }, { text: "About Us" }]} />
            <PagePath2 title="About Us" />
            <div className="bg-white p-6 mb-6 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore nam velit impedit mollitia, facere consequuntur optio itaque id aliquid sequi provident at libero fugit ratione accusantium qui voluptate dolorem quasi.
                 
                    
                    {/* Buttons */}
                    <div className="flex justify-center gap-8">

                    <div className="flex justify-center gap-8 mt-6">
                        <Button text="Edit" variant={2} onClick={handleEdit} />
                    </div>
                    

                    </div>
                </div>
            </div>
        </Box>
  );
};

export default AboutUS;

