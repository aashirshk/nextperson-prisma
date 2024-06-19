//create a get method that will take id from the context , search for the id from prisma
//if found return the data record

// import { PersonResponse } from "@/app/lib/person";
import { PrismaClient } from "@prisma/client";
import { prisma_client } from "@/app/database/client";


// console.log(prisma_client)

// const prisma = new PrismaClient();

export async function GET(request: Request, context: any) {
  const { id } = context.params;

  const person = await prisma_client.person.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!person) {
    return new Response("Not found", {
      status: 404,
    });
  }
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request: Request, context: any) {
  const { id } = context.params;

  try {
    const body = await request.json();
    const { firstname, lastname, phone, date_of_birth } = body;

    if (!firstname || !lastname || !phone || !date_of_birth) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    const updatedPerson = await prisma_client.person.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstname,
        lastname,
        phone,
        date_of_birth,
        // You can add other fields to update here
      },
    });

    if (!updatedPerson) {
      return new Response("Person not found", {
        status: 404,
      });
    }

    // const updatePersonResponse: PersonResponse = {
    //   ...updatedPerson,
    //   date_of_birth: updatedPerson.date_of_birth.toLocaleDateString(),
    // };

    return new Response(JSON.stringify(updatedPerson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error", {
      status: 500,
    });
  }
}
export async function DELETE(request: Request, context: any) {
  const { id } = context.params;

  try {
    const deletedPerson = await prisma_client.person.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deletedPerson) {
      return new Response("Person not found", {
        status: 404,
      });
    }

    return new Response("Person deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error", {
      status: 500,
    });
  }
}
