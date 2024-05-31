import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Person, PersonResponse } from "../../lib/person";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const people = await prisma.person.findMany();
  const final_people = people.map((p) => {
    return { ...p, date_of_birth: p.date_of_birth.toLocaleDateString() };
  });
  return new Response(JSON.stringify(final_people), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { firstname, lastname, phone, date_of_birth } = body;
    if (!firstname || !lastname || !phone || !date_of_birth) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    const person = await prisma.person.create({
      data: {
        firstname,
        lastname,
        phone,
        date_of_birth,
      },
    });

    const personResponse: PersonResponse = {
      ...person,
      date_of_birth: person.date_of_birth.toLocaleDateString(),
    };

    //return the data record
    return new Response(JSON.stringify(personResponse), {
      status: 202,
    });
  } catch (error) {
    return new Response("Error", {
      status: 500,
    });
  }
}
