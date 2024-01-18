import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Wrapper/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Props {}
const MessagePage: React.FC<Props> = () => {
  const navigator = useNavigate();
  const { user } = useAuth();
  if (!user) {
    navigator("/signin");
  }
  useEffect(() => {}, []);
  return (
    <div className="mx-auto max-w-6xl border border-2 rounded-md">
      No Message
    </div>
  );
};

export default MessagePage;
