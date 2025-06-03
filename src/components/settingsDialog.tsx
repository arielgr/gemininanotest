"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../components/ui/tooltip";
import { Slider } from "../components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { useAtom } from "jotai";
import { settingsAtom } from "@/lib/store";
import Link from "next/link";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  model: z.enum(["generic", "text"]),
  temperature: z.number().min(0).max(1),
  topK: z.number().min(1),
  initialPrompt: z.string(),
});
export type ModelSettings = z.infer<typeof formSchema>;

export const SettingsDialog = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const { toast } = useToast();
  // Fix: ensure model is always 'generic' or 'text' for form default values
  const form = useForm<ModelSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...settings,
      model:
        settings.model === "generic" || settings.model === "text"
          ? settings.model
          : "generic",
    },
    values: {
      ...settings,
      model:
        settings.model === "generic" || settings.model === "text"
          ? settings.model
          : "generic",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSettings(values);
    toast({ title: "Settings updated" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Model Settings</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6"
          >
            <fieldset className="grid gap-6 rounded-lg">
              {/* <FormField */}
              {/*   control={form.control} */}
              {/*   name="model" */}
              {/*   render={({ field }) => ( */}
              {/*     <FormItem> */}
              {/*       <FormLabel>Model</FormLabel> */}
              {/*       <Select */}
              {/*         onValueChange={field.onChange} */}
              {/*         defaultValue={field.value} */}
              {/*       > */}
              {/*         <FormControl> */}
              {/*           <SelectTrigger */}
              {/*             id="model" */}
              {/*             className="items-start [&_[data-description]]:hidden" */}
              {/*           > */}
              {/*             <SelectValue placeholder="Select a model" /> */}
              {/*           </SelectTrigger> */}
              {/*         </FormControl> */}
              {/*         <SelectContent> */}
              {/*           <SelectItem value="generic"> */}
              {/*             <div className="flex items-start gap-3 text-muted-foreground"> */}
              {/*               <div> */}
              {/*                 Gemini Nano{" "} */}
              {/*                 <span className="font-medium text-foreground"> */}
              {/*                   Generic */}
              {/*                 </span> */}
              {/*               </div> */}
              {/*             </div> */}
              {/*           </SelectItem> */}
              {/*           <SelectItem value="text"> */}
              {/*             <div className="flex items-start gap-3 text-muted-foreground"> */}
              {/*               <div> */}
              {/*                 Gemini Nano{" "} */}
              {/*                 <span className="font-medium text-foreground"> */}
              {/*                   Text */}
              {/*                 </span> */}
              {/*               </div> */}
              {/*             </div> */}
              {/*           </SelectItem> */}
              {/*         </SelectContent> */}
              {/*       </Select> */}
              {/*       <FormDescription /> */}
              {/*       <FormMessage /> */}
              {/*     </FormItem> */}
              {/*   )} */}
              {/* /> */}
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="grid gap-3 hover:cursor-help">
                            <div className="flex items-center justify-between">
                              <FormLabel className="hover:cursor-help">
                                Temperature
                              </FormLabel>
                              <span className="text-right text-sm text-muted-foreground">
                                {field.value}
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="start"
                          className="w-80"
                        >
                          <p className="m-2">
                            0 means almost deterministic results, and higher
                            values mean more randomness.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <FormControl>
                      <Slider
                        onValueChange={(v) => field.onChange(v[0])}
                        value={[field.value]}
                        id="temperature"
                        className="hover:cursor-pointer"
                        defaultValue={[settings.temperature]}
                        max={1}
                        min={0}
                        step={0.1}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topK"
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="grid gap-3 hover:cursor-help">
                            <div className="flex items-center justify-between">
                              <FormLabel className="hover:cursor-help">
                                Top K
                              </FormLabel>
                              <span className="text-right text-sm text-muted-foreground">
                                {field.value}
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="start"
                          className="w-80"
                        >
                          <p className="m-2">
                            Top-k is to limit the model
                            {"'"}s choices when generating text.
                            <br />
                            <span className="font-medium">Small Top-k: </span>
                            responses are more focused and predictable.
                            <br />
                            <span className="font-medium">Large Top-k: </span>
                            responses are more diverse and creative.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <FormControl>
                      <Slider
                        id="topK"
                        className="hover:cursor-pointer"
                        onValueChange={(v) => field.onChange(v[0])}
                        value={[field.value]}
                        defaultValue={[settings.topK]}
                        max={20}
                        min={1}
                        step={1}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="initialPrompt"
                render={({ field }) => (
                  <FormItem>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-between hover:cursor-help">
                            <FormLabel className="hover:cursor-help">
                              Initial Prompt
                            </FormLabel>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="start" className="w-80">
                          <p className="m-2">
                            The initial prompt is sent to the model before any user input. Use it to set behavior, style, or context for the AI's responses.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <FormControl>
                      <textarea
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="e.g. You are a helpful assistant."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This prompt will influence the model's responses at the start of each session.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <Link
              href="https://gemini.google.com/share/a4665036f4b9"
              target="_blank"
              className="text-sm underline"
            >
              Want to know more about Temperature and Top-K?
            </Link>
            <DialogTrigger asChild>
              <Button type="submit">Save</Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
