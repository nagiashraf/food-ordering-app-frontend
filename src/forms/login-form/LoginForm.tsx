import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/api/AuthApi";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
});

export type LoginFormData = z.infer<typeof formSchema>;

const LoginForm = ({ isLoading }: { isLoading: boolean }) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { 
    logUserIn
  } = useLogin();

  const onSubmit = form.handleSubmit((data) => {
    logUserIn(data);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <h2 className="text-3xl font-bold">Log In</h2>

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

        <span className="flex items-center justify-between">
          <span className="text-sm">
            Not Registered? <Link className="underline" to="/register">Create an account here</Link>
          </span>
          {isLoading ? ( 
            <LoadingButton />
          ) : (
            <Button type="submit" className="bg-orange-500">Log In</Button>
          )} 
        </span>
      </form>
    </Form>
  );
};

export default LoginForm;
