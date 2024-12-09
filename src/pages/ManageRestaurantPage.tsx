import { useCreateRestaurant, useGetRestaurant, useUpdateRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: isCreatePending } = useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isPending: isUpdatePending } = useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreatePending || isUpdatePending}
    />
  );
};

export default ManageRestaurantPage;