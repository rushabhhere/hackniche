import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function InputDemo() {
  const nameRef = useRef();
  const ipRef = useRef();
  const portRef = useRef();
  function handleSubmit() {

    const data = {
      name: nameRef.current?.value,
      ip: ipRef.current?.value,
      port: portRef.current?.value,
    };
    try {
      fetch(`http://${data.ip}:${data.port}/health`);
      // success notify
      toast("Instance has been added");
    } catch {
      // fail notify
      toast("Failed to add instance", );
    }
    // console.log(data);

    fetch(`/api/agent/create`, {
      method: "post",
      body: JSON.stringify(data)
    })
  }
  return (
    <>
      <Toaster richColors />
      <div className=" justify-center items-center h-screen  flex flex-col gap-4">
        <div className="border-2 border-gray-200 rounded-md p-6 flex flex-col gap-4">
          <h1 className="text-gray-200 text-3xl font-bold">Add New Instance</h1>
          <Input type="text" placeholder="Name" ref={nameRef} />
          <Input type="text" placeholder="IP Address" ref={ipRef} />
          <Input type="text" placeholder="Port" ref={portRef} />
          <Button variant="default" onClick={handleSubmit}>
            Add Instance
          </Button>
        </div>
      </div>
    </>
  );
}
