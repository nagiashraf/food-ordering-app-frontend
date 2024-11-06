import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/api/UserApi";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string({ required_error: "Confirm Password is required" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { 
    registerUser
  } = useRegister();

  const onSubmit = form.handleSubmit((data) => {
    registerUser(data);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <h2 className="text-3xl font-bold">Create an Account</h2>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
                <Input {...field} type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="flex items-center justify-between">
          <span className="text-sm">
            Already have an account? <Link className="underline" to="/login">Sign in</Link>
          </span>
            <Button type="submit" className="bg-orange-500">Create Account</Button>
        </span>

        
      </form>
    </Form>
  );
};

export default RegisterForm;
