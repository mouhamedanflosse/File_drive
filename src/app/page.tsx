"use client";
import { Button } from "@/components/ui/button";
import {
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "@/components/ui/Header";
import MaxWidthWrapper from "@/components/ui/MaxWithWrapper";

export default function Home() {
  const organization = useOrganization()
  const user = useUser()

  let orgId = null
  
  if ( organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  // console.log(organization?.id)
  // console.log(organization?.imageUrl)

  // create name
  const creatdocs = useMutation(api.docs.createdocs);

  // files
  const docs = useQuery(api.docs.getdocs , orgId ? {orgId } : "skip");

  const fn = () => {
    if (!orgId) return ;
    creatdocs({ name: `docs:${(Math.random() * 1000000).toFixed(0)}` , orgId : orgId});
  };

  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-end  pt-2">
        <Header />
      </div>
      <main className="flex mt-5  min-h-screen flex-col items-center gap-4">
        {docs?.map((file, i) => {
          return <h1 key={i}>{file.name}</h1>;
        })}
        <Button onClick={() => fn()}>add product</Button>
        {/* <Button onClick={() => createProduct({ name: "nadi " })}>
          add product
        </Button> */}
      </main>
    </MaxWidthWrapper>
  );
}
