"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { useTransition, useState } from "react";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Coupon } from "@/actions/coupon";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { LoaderCircle } from "lucide-react";

export const CodeSchema = Z.z.object({
  pid: Z.z.string().nonempty(),
});

export function CodeForm({ className, ...props }: React.ComponentProps<"div">) {
  const form = useForm<Z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      pid: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");
  const onSubmit = (values: Z.infer<typeof CodeSchema>) => {
    setError("");
    SetSuccess("");

    startTransition(() =>
      Coupon(values.pid)
        .then((data) => {
          if (data) {
            console.log(data);
            SetSuccess("兑换成功");
          } else {
            setError("兑换失败");
          }
        })
        .catch(() => {
          setError("兑换失败");
        })
    );
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Seven Knights Reverse Coupon</CardTitle>
          <CardDescription>Enter your pid below to coupon</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <>
                  <FormField
                    control={form.control}
                    name="pid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PID</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                ) : (
                  <>Submit</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
