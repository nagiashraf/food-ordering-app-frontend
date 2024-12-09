import { Restaurant } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = () => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isPending } = useQuery({
    queryKey: ['fetchRestaurant'],
    queryFn: getRestaurantRequest
  });

  return { restaurant, isPending };
};

export const useCreateRestaurant = () => {
  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: "POST",
      credentials: "include",
      body: restaurantFormData
    });

    if (!response) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const { mutate: createRestaurant, isPending, isSuccess, error } = useMutation({
    mutationFn: createRestaurantRequest
  });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isPending };
};

export const useUpdateRestaurant = () => {
  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
      method: "PUT",
      credentials: "include",
      body: restaurantFormData
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isPending, isSuccess, error } = useMutation({
    mutationFn: updateRestaurantRequest
  });

  if (isSuccess) {
    toast.success("Restaurant updated!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isPending };
};