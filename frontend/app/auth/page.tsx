"use client";
import SubmitButton from "@/components/global/SubmitButton";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Footprints, Lock, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { submit, loading } = useAuth();
  const form = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    await submit(data.username, data.password);
  };

  return (
    <div className="h-screen relative isolate bg-white w-full flex items-center justify-around px-10">
      <div className="w-full lg:max-w-lg xl:max-w-xl hidden lg:block">
        <div className="relative aspect-square w-full">
          <Image alt="landing" src="/landing.png" fill />
        </div>
      </div>

      <div className="space-y-4 max-w-xl md:max-w-md w-full">
        <span className="flex px-6 lg:px-2 gap-3">
          <Footprints className="mt-1 text-gray-600" size={40} />
          <h1 className="text-4xl font-inter font-extrabold text-black/80">
            Synkro
          </h1>
        </span>
        <div className="flex bg-transparent md:bg-white flex-col border-0 md:border shadow-none md:shadow-md rounded-lg p-6 md:p-12 font-inter">
          <div className="mb-8">
            <h1 className="font-bold text-xl text-zinc-700">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-500 text-sm">
              Por favor, inicie sesión en su cuenta para continuar
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 font-inter"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Correo eléctronico
                    </FormLabel>
                    <FormControl>
                      <Input
                        Icon={UserRound}
                        placeholder="email@example.com.mx"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        Icon={Lock}
                        type="password"
                        placeholder="· · · · · · · ·"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <SubmitButton loading={loading}>Continuar</SubmitButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
