"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useFormInputs, formSchema, inputs } from "./inputs";
import Icon from "@/components/icons";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
// import Image from "next/image";

export default function Home() {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const form = useFormInputs();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoader(true);

    try {
      await axios.post("/api/discoveries", values);

      alert("✅ Discovery cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("❌ Erro ao cadastrar discovery.");
    } finally {
      form.reset();
      setIsLoader(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 justify-center">
      <div className="mb-8 lg:max-w-1/2 space-y-4">
        <h1 className="scroll-m-20 border-b border-[#5895c5] pb-2 text-[#f5f5f5] text-3xl font-semibold tracking-tight first:mt-0">
          Formulário de descoberta
        </h1>
        <p className="text-muted-foreground text-justify text-md">
          Este formulário tem como objetivo coletar informações essenciais sobre
          a sua empresa, seus desafios e expectativas. As respostas irão nos
          ajudar a compreender melhor o contexto do seu negócio e a construir
          soluções personalizadas aplicando a metodologia nossas metodologias.
          Por favor, preencha os campos com o máximo de clareza possível.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:w-1/2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputs.map((input, index) => (
              <FormField
                key={index}
                control={form.control}
                disabled={isLoader}
                name={input.name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem
                    className={
                      input.cols === 2
                        ? "col-span-1 md:col-span-2"
                        : "col-span-1"
                    }
                  >
                    <FormLabel
                      className={input.name === "whatsapp" ? "sr-only" : ""}
                      htmlFor={field.name}
                    >
                      {input.label}
                      {!(
                        input.name === "tools" ||
                        input.name === "comments" ||
                        input.name === "whatsapp" ||
                        input.name === "deadline" ||
                        input.name === "value" ||
                        input.name === "products" ||
                        input.name === "target"
                      ) && <span className="text-red-400"> *</span>}
                    </FormLabel>
                    <FormControl>
                      {input.name === "value" ? (
                        <Input
                          {...field}
                          type="text"
                          value={field.value as any}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");

                            if (!value) {
                              field.onChange("");
                              return;
                            }

                            let numberValue = parseInt(value, 10);
                            let formatted = (numberValue / 100).toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            );

                            field.onChange(formatted);
                          }}
                        />
                      ) : input.name === "phoneNumber" ? (
                        <Input
                          {...field}
                          type="text"
                          value={field.value as any}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 11) value = value.slice(0, 11);

                            if (value.length === 0) {
                              field.onChange("");
                              return;
                            }

                            if (value.length < 3) {
                              field.onChange(value);
                              return;
                            }

                            if (value.length <= 10) {
                              value = value.replace(
                                /^(\d{2})(\d{0,4})(\d{0,4})$/,
                                (_, ddd, part1, part2) =>
                                  [`(${ddd})`, part1, part2 ? `-${part2}` : ""]
                                    .filter(Boolean)
                                    .join("")
                              );
                            } else {
                              value = value.replace(
                                /^(\d{2})(\d{0,5})(\d{0,4})$/,
                                (_, ddd, part1, part2) =>
                                  [`(${ddd})`, part1, part2 ? `-${part2}` : ""]
                                    .filter(Boolean)
                                    .join("")
                              );
                            }

                            field.onChange(value);
                          }}
                        />
                      ) : input.name === "whatsapp" ? (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={field.name}
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoader}
                            name={field.name}
                            ref={field.ref}
                          />
                          <FormDescription>
                            <FormLabel
                              htmlFor={field.name}
                              className={
                                input.name !== "whatsapp" ? "hidden" : ""
                              }
                            >
                              {input.description}
                            </FormLabel>
                          </FormDescription>
                        </div>
                      ) : input.name === "comments" ||
                        input.name === "challenges" ||
                        input.name === "tools" ||
                        input.name === "objectives" ||
                        input.name === "products" ? (
                        <Textarea
                          className="h-20"
                          {...field}
                          value={field.value as string}
                        />
                      ) : input.name === "deadline" ? (
                        <Input
                          {...field}
                          type="text"
                          value={field.value as any}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);
                          }}
                        />
                      ) : (
                        <Input
                          {...field}
                          type={input.type}
                          value={field.value as any}
                        />
                      )}
                    </FormControl>
                    <FormDescription
                      className={input.name === "whatsapp" ? "hidden" : ""}
                    >
                      {input.description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button
            className="w-full text-white"
            type="submit"
            disabled={isLoader}
          >
            {isLoader ? (
              <>
                <Icon name="LoaderCircle" className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
      {/* <footer className="w-full flex items-center px-14 bg-[#172144] h-20 mt-4">
        <Image
          src="/aude_logotipo.png"
          width={100}
          height={100}
          alt="Picture of the author"
        />
      </footer> */}
    </div>
  );
}
