import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form"
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery Price is required",
    invalid_type_error: "Delivery Price must be a valid number",
  }),
  estimatedDeliveryTimeInMinutes: z.coerce.number({
    required_error: "Estimated Delivery Time is required",
    invalid_type_error: "Estimated Delivery Time must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please, select at least one cuisine",
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(1, "Price is required"),
  })),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  imgUrl: z.string().optional()
}).refine((data) => data.imgUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"]
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{name: "", price: 0}],
    }
  });
  
  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2))
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted
    }

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData ) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTimeInMinutes",
      formDataJson.estimatedDeliveryTimeInMinutes.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    });

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return(
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
          <DetailsSection />
          <Separator />
          <CuisinesSection />
          <Separator />
          <MenuSection />
          <Separator />
          <ImageSection />

          {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </FormProvider>
  )
};

export default ManageRestaurantForm;