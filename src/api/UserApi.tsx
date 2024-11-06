import { RegisterFormData } from "@/forms/register-form/RegisterForm";
import { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
  const getUserRequest = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const { data: user, isPending } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: getUserRequest
  });

  return { user, isPending };
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const registerRequest = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }
  }

  const navigate = useNavigate();
  const { 
    mutate: registerUser
  } = useMutation({
    mutationFn: registerRequest,
    onSuccess: async () => { 
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate("/");
    }
  });

  return {
    registerUser
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateUser = () => {
  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutate: updateUser,
    isPending,
    isSuccess,
    error,
    reset
  } = useMutation({ mutationFn: updateUserRequest });

  if (isSuccess) {
    toast.success("Profile updated!"); 
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isPending };
};
