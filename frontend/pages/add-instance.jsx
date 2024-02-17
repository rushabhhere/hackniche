import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export default function InputDemo() {
  const nameRef = useRef();
  const ipRef = useRef();
  const portRef = useRef();
  function handleSubmit() {
    // alert("Yaha aaya");

    const data = {
      name: nameRef.current?.value,
      ip: ipRef.current?.value,
      port: portRef.current?.value,
    };

    console.log(data);

    fetch(`/api/agent/create`, {
      method: "post",
      body: JSON.stringify(data) 
    })
  }
  return (
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
  );
}
