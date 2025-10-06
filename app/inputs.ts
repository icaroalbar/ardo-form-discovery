import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface InputProps {
  name: string;
  label: string;
  type: string;
  description: string;
  cols: number;
}

export const inputs: InputProps[] = [
  {
    name: "company",
    label: "Nome fantasia",
    type: "text",
    description: "Nome fantasia da empresa",
    cols: 2,
  },
  {
    name: "responsible",
    label: "Nome do responsável",
    type: "text",
    description: "Nome do responsável principal pelo projeto.",
    cols: 1,
  },
  {
    name: "position",
    label: "Cargo",
    type: "text",
    description: "Nome do cargo do responsável pelo contato",
    cols: 1,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    description: "E-mail do responsável",
    cols: 2,
  },
  {
    name: "phoneNumber",
    label: "Contato",
    type: "text",
    description: "Numero de celular do responsável",
    cols: 1,
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    type: "checkbox",
    description: "Esse numero possui WhatsApp",
    cols: 1,
  },
  {
    name: "target",
    label: "Público Alvo",
    type: "text",
    description: "Qual é o público-alvo principal da sua empresa",
    cols: 2,
  },
  {
    name: "products",
    label: "Produtos e Serviços",
    type: "text",
    description: "Quais produtos/serviços principais sua empresa oferece",
    cols: 2,
  },
  {
    name: "challenges",
    label: "Desafios",
    type: "text",
    description: "O que vocês esperam alcançar com os nossos serviços",
    cols: 2,
  },
  {
    name: "tools",
    label: "Ferramentas",
    type: "text",
    description: "Ferramentas que a empresa usa atualmente que devemos saber",
    cols: 2,
  },
  {
    name: "objectives",
    label: "Objetivos",
    type: "text",
    description: "O que vocês esperam alcançar com os nossos serviços",
    cols: 2,
  },
  {
    name: "deadline",
    label: "Prazo",
    type: "text",
    description: "Prazo esperado para alcançar os objetivos (em meses)",
    cols: 1,
  },
  {
    name: "value",
    label: "Valor (R$)",
    type: "text",
    description: "Existe orçamento disponível ou faixa estimada",
    cols: 1,
  },
  {
    name: "comments",
    label: "Observações",
    type: "text",
    description: "Observações adicionais que gostaria de compartilhar",
    cols: 2,
  },
];

export const formSchema = z.object(
  inputs.reduce((acc, input) => {
    if (input.name === "whatsapp" && input.type === "checkbox") {
      acc[input.name] = z.boolean();
    } else if (input.name === "email") {
      acc[input.name] = z.email({ message: "Email inválido" });
    } else if (input.name === "phoneNumber") {
      acc[input.name] = z
        .string()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => val.length >= 10 && val.length <= 11, {
          message: "Telefone deve ter entre 10 e 11 dígitos",
        });
    } else if (
      input.name === "tools" ||
      input.name === "comments" ||
      input.name === "deadline" ||
      input.name === "value" ||
      input.name === "products" ||
      input.name === "target"
    ) {
      acc[input.name] = z.string().optional();
    } else if (input.name === "deadline") {
      acc[input.name] = z
        .string()
        .optional()
        .refine((val) => !val || /^\d+$/.test(val), {
          message: "Prazo deve conter apenas números",
        });
    } else {
      acc[input.name] = z
        .string()
        .min(2, { message: `${input.label} é obrigatório` });
    }
    return acc;
  }, {} as Record<string, z.ZodTypeAny>)
);

export function useFormInputs() {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      inputs.map((input) => [
        input.name,
        input.name === "whatsapp" ? false : "",
      ])
    ),
  });
}
