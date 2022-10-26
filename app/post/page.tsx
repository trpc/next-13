import { CreatePostForm } from "./CreatePostForm";

export default function Page() {
  return (
    <div className="flex p-4 flex-col justify-center">
      <p className="">
        Select a post in the sidebar, or create a new on using the form below
      </p>
      <CreatePostForm />
    </div>
  );
}
