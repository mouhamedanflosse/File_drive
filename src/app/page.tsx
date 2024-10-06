"use client";
import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "@/components/ui/Header";
import MaxWidthWrapper from "@/components/ui/MaxWithWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Home() {
  // --------------------------convex mustation & queries

  const organization = useOrganization();
  const user = useUser();

  // // orgID verification
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  // files
  const docs = useQuery(api.docs.getdocs, orgId ? { orgId } : "skip");

  
  // create name
  const creatdocs = useMutation(api.docs.createdocs);


  const fn = () => {
    if (!orgId) return;
    console.log(orgId)
    creatdocs({
      name: `docs:${(Math.random() * 1000000).toFixed(0)}`,
      orgId: orgId,
    });
  };

  // from submition
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    if (!orgId) return;
    creatdocs({
      name: `docs:${(Math.random() * 1000000).toFixed(0)}`,
      orgId: orgId,
    });

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  // ---------------------------------form validation
  // zod schema
  const FormSchema = z.object({
    docName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    file: z.custom<File | null>((val) => val instanceof File, "required"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      docName: "",
      file: null,
    },
  });

  const formRef = form.register("file")
  
  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-end  pt-2">
        <Header />
      </div>
      <main className="flex mt-5  min-h-screen flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center py-3 ">
          <h1 className="text-[30px] font-semibold">Your Docs</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => fn()}>add product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>upload your docs</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="docName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 text-[13px]">
                          Doc Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          <FormMessage />
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ ...field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500 text-[13px]">
                          document
                        </FormLabel>
                        <FormControl>
                          <Input id="doc" type="file" {...field} />
                        </FormControl>
                        <FormDescription>
                          <FormMessage />
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        {docs?.map((file, i) => {
          return <h1 key={i}>{file.name}</h1>;
        })}
      </main>
    </MaxWidthWrapper>
  );
}
