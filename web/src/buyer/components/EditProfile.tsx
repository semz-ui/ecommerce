import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { editProfile } from "@/feature/auth/authSlice";
import { useState } from "react";

function EditProfile({ firstNm, lastNm, eml, role }: any) {
  const [formData, setFormData] = useState({
    firstName: firstNm,
    lastName: lastNm,
    email: eml,
  });

  const { firstName, lastName, email } = formData;
  console.log(formData, "formData");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleEditProfile = () => {
    dispatch(
      editProfile({
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-10">
          Edit
        </Button>
      </DialogTrigger>
      {role == "name" && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                First Name
              </Label>
              <Input
                id="name"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Last Name
              </Label>
              <Input
                id="username"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditProfile}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
      {role == "email" && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                email
              </Label>
              <Input
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditProfile}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default EditProfile;
