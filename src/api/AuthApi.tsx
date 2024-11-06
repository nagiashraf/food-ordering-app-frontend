import { LoginFormData } from "@/forms/login-form/LoginForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useValidateToken = () => {
  const validateTokenRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("Token invalid");
    }

    return response.json();
  }

  const { data, isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: validateTokenRequest,
    retry: false
  });

  const userEmail = data?.email;

  return { userEmail, isError };
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginRequest = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to log user in");
    }
  }

  const navigate = useNavigate();
  const { 
    mutate: logUserIn
  } = useMutation({
    mutationFn: loginRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate("/");
    }
  });

  return {
    logUserIn
  };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Error during logout");
    }
  }

  const navigate = useNavigate();
  const { 
    mutate: logOut
  } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate("/login");
    }
  });

  return {
    logOut
  };
};