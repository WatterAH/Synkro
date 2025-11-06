import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Barcode, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Product } from "@/interfaces/Product";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useMainProduct } from "@/hooks/useInventory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { colors, tallas } from "@/constants/inventory";
import SubmitButton from "../global/SubmitButton";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import inventoryRouter from "@/routes/inventory";

interface Props {
  reload: () => void;
}

const Create: React.FC<Props> = ({ reload }) => {
  const { user } = useUser();
  const { data } = useMainProduct();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<Partial<Product>>({
    mode: "onChange",
    defaultValues: {
      product_id: "",
      barcode: "",
      tipo: "",
      talla: "18",
      color: "",
      sucursal_id: user.sucursal_id == null ? null : user.sucursal_id,
    },
  });

  async function handleSubmit(data: Partial<Product>) {
    try {
      setLoading(true);
      await inventoryRouter.create(data);
      toast.success("Hecho!");
      reload();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const p = data.find((d) => d.id === form.getValues("product_id"));
    if (p) {
      form.setValue("tipo", p.sku_base.slice(0, 1));
      console.log(p.sku_base.slice(1, 4));
      form.setValue("variante", p.sku_base.slice(1, 4));
    }
  }, [form.watch("product_id")]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Plus />
          <p className="font-inter">Nuevo producto</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-semibold font-inter text-2xl">
            Nuevo producto
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div>
              <FormField
                name="product_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de producto</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de barras</FormLabel>
                    <FormControl>
                      <Input
                        Icon={Barcode}
                        placeholder="123456789"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="talla"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Talla</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona una talla" />
                        </SelectTrigger>
                        <SelectContent>
                          {tallas.map((t) => (
                            <SelectItem key={t} value={String(t)}>
                              <span className="flex items-center gap-2">
                                {t}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un color" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              <span className="flex items-center gap-2">
                                <div className={`${c.bg} rounded-full p-2`} />
                                {c.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton loading={loading}>Guardar</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
