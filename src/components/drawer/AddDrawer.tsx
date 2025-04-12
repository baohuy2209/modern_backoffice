import * as React from "react";
import {
  Drawer,
  Button,
  Input,
  message,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import uploadFile from "../../api/uploadFile";
import getPublicUrl from "../../api/getPublicUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addStudent from "../../api/addStudent";
import { useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import TUNISIA_REGIONS from "../../constants/regions";
import { BiPhone, BiUser, BiUserPlus } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { CgClose } from "react-icons/cg";
import AddNewUserIcon from "../../assets/icons/AddNewUser.svg";
import ImportAvatar from "../../assets/icons/importAvatar.svg";
import UploadIcon from "../../assets/icons/uploadIcon.svg";
const { Dragger } = Upload;
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { StudentDataType } from "../../types/index";
interface IAddDrawerProps {}

const AddDrawer: React.FunctionComponent<IAddDrawerProps> = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [isUploading, setIsUpLoading] = React.useState<boolean>(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const toggleDrawer = useToggleDrawer();
  const { mutate: addStudentApi } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
  const onCloseDrawer = () => {
    toggleDrawer(false, "showDrawerAdd");
  };
  React.useEffect(() => {
    const queryParam = new URLSearchParams(location.search);
    const showDrawerParams = queryParam.get("showDrawerAdd");
    if (showDrawerParams === "true") {
      setIsAddDrawerOpen(true);
    } else {
      setIsAddDrawerOpen(false);
    }
  }, [location.search]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Omit<StudentDataType, "id" | "created_at" | "course_enrolled">>();
  const onSubmit = (
    data: Omit<StudentDataType, "id" | "created_at" | "course_enrolled">
  ) => {
    if (avatar) {
      data.avatar = avatar;
    }

    addStudentApi(data);
    reset();
    onCloseDrawer();
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    async onChange(info) {
      const { status } = info.file;
      setIsUpLoading(true);
      if (status === "done") {
        const file = info.file.originFileObj;
        const filePath = await uploadFile(file);
        if (!filePath) {
          return;
        }
        const fileUrl = getPublicUrl(filePath);
        setAvatar(fileUrl);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }

      setIsUpLoading(false);
    },
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess?.("ok");
      }, 0);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Drawer
      width={500}
      title="Add student"
      open={isAddDrawerOpen}
      onClose={() => onCloseDrawer()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onClick={onCloseDrawer}
          className="bg-slate-200 absolute top-10 right-10 p-3 rounded-full transition-all duration-200 cursor-pointer hover: opacity-80"
        >
          <CgClose />
        </div>
        <div className="flex items-center gap-4 py-6 px-10">
          <img src={AddNewUserIcon} alt="add user icon" />
          <div className="flex flex-col">
            <p className="text-[1.6rem]">Add new Student</p>
            <p className="text-[1.4rem] font-extralight w-11/12">
              Choose a username and complete all user details.
            </p>
          </div>
        </div>
        <hr />
        <div className="flex items-center">
          <img
            src={avatar || ImportAvatar}
            alt="import avatar icon"
            className="w-32 h-32 rounded-[50%] object-cover"
          />
          <div className="flex flex-col gap-4 w-10/12">
            <p className="text-[1.6rem]">Import your image profile</p>
            <Dragger
              {...props}
              className="bg-color-blue-4 rounded-3xl"
              showUploadList={false}
            >
              <div className="flex items-center gap-5">
                {isUploading ? (
                  <Spin />
                ) : (
                  <img src={UploadIcon} alt="upload icon" />
                )}
                <p className="text-[1.4rem] font-extralight w-8/12">
                  <strong>Click to Upload</strong> or drag and drop SVG, PNG,
                  JPG or GIF
                </p>
              </div>
            </Dragger>
          </div>
        </div>
        <hr />
        <div className="mt-6 flex flex-col">
          <div
            className="p-2 pl-6 text-[#2860D7] text-[1.6rem]"
            style={{
              background:
                "linear-gradient(90.09deg, rgba(255,255,255,0.43) 6.16%, rgba(68, 143, 237, 0.43) 70.73%, rgba(8, 111, 233, 0.6) 99.98%)",
            }}
          >
            Information
          </div>
          <div className="mt-6 px-6 py-4 flex flex-col gap-4">
            <label htmlFor="name" className="text-gray-700">
              Name (<span className="text-red-500">*</span>)
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<BiUser />}
                  placeholder="Enter user Name"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="email" className="text-gray-700">
              Email Address (<span className="text-red-500">*</span>)
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<TfiEmail />}
                  placeholder="Enter email address"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="region" className="text-gray-700">
              Region (<span className="text-red-500">*</span>)
            </label>
            <Controller
              name="region"
              control={control}
              rules={{ required: "Region is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Choose region">
                  {TUNISIA_REGIONS.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.region && (
              <p className="text-red-500 text-[1.2rem]">
                {errors.region.message as string}
              </p>
            )}
          </div>
          <div className="px-6 py-4 flex flex-col gap-4">
            <label htmlFor="phone_number" className="text-gray-700">
              Phone Number (<span className="text-red-500">*</span>)
            </label>
            <Controller name="phone_number" control={control} rules={{required: "Phone number is required", pattern: {value: /^\d{8}$/,message: "Phone number must be 8 digits" }}} render={({field}) => (
              <Input />
            )}/>
          </div>
        </div>
      </form>
    </Drawer>
  );
};

export default AddDrawer;
