import { cn } from "@/components/lib/utils";
import EditProfile from "@/buyer/components/EditProfile";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

function EditDetails() {
  return (
    <MaxWidthWrapper className={cn("max-w-screen-sm")}>
      <div className={cn("text-4xl font-medium text-center mb-10")}>
        Login and Security
      </div>
      <div className={cn("border rounded-sm")}>
        <div className={cn("flex justify-between my-5")}>
          <div className="ml-5">
            <h1>Name</h1>
            <p>Olotu Michael</p>
          </div>
          <div className="mr-5">
            <EditProfile />
          </div>
        </div>
        <Separator />
        <div className={cn("flex justify-between my-5")}>
          <div className="ml-5">
            <h1>Email</h1>
            <p className="text-sm text-muted-foreground">
              Your email got hacked? no worries you have an opportunity to
              change them here.
            </p>
          </div>
          <div className="mr-5">
            <Button variant="outline" className="px-10">
              Edit
            </Button>
          </div>
        </div>
        <Separator />
        <div className={cn("flex justify-between my-5")}>
          <div className="ml-5">
            <h1>Password</h1>
            <p className="text-sm text-muted-foreground">
              Password has been breached? change them here
            </p>
          </div>
          <div className="mr-5">
            <Button variant="outline" className="px-10">
              Edit
            </Button>
          </div>
        </div>
        <Separator />
      </div>
    </MaxWidthWrapper>
  );
}

export default EditDetails;
