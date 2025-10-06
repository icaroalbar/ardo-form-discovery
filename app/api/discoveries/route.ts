import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Processa o valor
    let processedValue = null;
    if (data.value && typeof data.value === "string") {
      // Remove "R$", pontos e converte vírgula em ponto
      const cleanValue = data.value.replace(/[^\d,]/g, "").replace(",", ".");
      processedValue = parseFloat(cleanValue);
    }

    // Processa o deadline
    let processedDeadline = null;
    if (data.deadline) {
      processedDeadline = parseInt(data.deadline);
    }

    const discovery = await prisma.discovery.create({
      data: {
        company: data.company,
        responsible: data.responsible,
        position: data.position,
        email: data.email,
        phoneNumber: data.phoneNumber,
        whatsapp: data.whatsapp,
        challenges: data.challenges,
        objectives: data.objectives,
        comments: data.comments || null,
        deadline: processedDeadline,
        value: processedValue,
        tools: data.tools || null,
        target: data.target || null,
        products: data.products || null,
      },
    });

    return NextResponse.json(discovery, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar discovery:", error);
    return NextResponse.json(
      { error: "Erro ao criar discovery" },
      { status: 500 }
    );
  }
}
