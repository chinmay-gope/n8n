"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: ({ message }) => {
        queryClient.invalidateQueries(trpc.getWorflows.queryOptions());
        toast.success(message);
      },
    })
  );
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <h1>Protected Page</h1>
      <p>{JSON.stringify(data)}</p>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
    </div>
  );
}
