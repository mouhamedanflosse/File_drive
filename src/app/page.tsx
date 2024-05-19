"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  // create name
  const creatdocs = useMutation(api.docs.createdocs);
  const createProduct = useMutation(api.docs.createProduct);

  // files
  const docs = useQuery(api.docs.getdocs);
  const prod  = useQuery(api.docs.getProd);

  const fn = () => {
    console.log("success");
    creatdocs({ name: `docs:${(Math.random() * 1000000).toFixed(0)}` });
  };

  return (
    <>
      <div className="w-full flex justify-end px-32 pt-2">
        <SignedOut>
          <SignInButton>
            <Button>sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button>sign Out</Button>
          </SignOutButton>
        </SignedIn>
      </div>
      <main className="flex min-h-screen flex-col items-center gap-4">
        {docs?.map((file, i) => {
          return <h1 key={i}>{file.name}</h1>;
        })}
        <Button onClick={() => fn()}>add product</Button>
        {/* <Button onClick={() => createProduct({ name: "nadi " })}>
          add product
        </Button> */}
      </main>
    </>
  );
}
