import Button from "@/Components/Button";
import Input from "@/Components/Input";
import React from "react";
import { useForm } from "react-hook-form";

const Profile: React.FC<UserDataLoaderInterface> = ({ profile }) => {
  const { control } = useForm({ mode: "all" });
  return (
    <>
      <h3 className="text-4xl font-bold tracking-wider">My Profile</h3>
      <div className="mt-6 w-1/2">{JSON.stringify(profile)}</div>
      <form className="mt-6 space-y-6 md:space-y-12">
        <div className="flex flex-col gap-6 md:gap-12 md:flex-row">
          <Input
            name="first_name"
            control={control}
            placeholder="First Name"
            rules={{ required: "First Name is required" }}
          />
          <Input
            name="last_name"
            control={control}
            placeholder="Last Name"
            rules={{ required: "Last name is required" }}
          />
        </div>
        <div>
          <Input
            name="email"
            disabled
            value={"email-is-here"}
            control={control}
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-6 md:gap-12 md:flex-row">
          <Input
            type="date"
            name="dob"
            control={control}
            placeholder="Date of birth"
          />
          <Input name="address" control={control} placeholder="Address" />
        </div>
        <div>
          <Input
            name="phone"
            control={control}
            defaultValue="ola"
            placeholder="Phone number"
            rules={{ required: "Phone number is required" }}
          />
        </div>
        <div className="flex flex-col items-end">
          <Button>Update</Button>
        </div>
      </form>
    </>
  );
};

export default Profile;
